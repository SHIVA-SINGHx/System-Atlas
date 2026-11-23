import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DSA_CURRICULUM,
  DSA_PRACTICE_PROBLEMS,
} from '../packages/contracts/dist/learning/index.js';
import { SSRFGuardService } from '../services/resource-service/dist/modules/ingestion/ssrf-guard.service.js';
import { IngestionService } from '../services/resource-service/dist/modules/ingestion/ingestion.service.js';
import { CodeSandboxService } from '../services/progress-service/dist/modules/practice/code-sandbox.service.js';

const REQUIRED_13_SLUGS = [
  'arrays-and-strings',
  'hashing',
  'two-pointers-and-sliding-window',
  'linked-lists',
  'stacks-and-queues',
  'binary-search',
  'recursion-and-backtracking',
  'trees-and-bst',
  'heaps-and-priority-queues',
  'graphs',
  'greedy-algorithms',
  'dynamic-programming',
  'tries-and-union-find',
];

test('DSA Curriculum: Contains all 13 required core curriculum topics with full content structure', () => {
  assert.equal(DSA_CURRICULUM.length, 13, 'Expected exactly 13 DSA curriculum topics');

  const presentSlugs = DSA_CURRICULUM.map((t) => t.slug);
  for (const slug of REQUIRED_13_SLUGS) {
    assert.ok(presentSlugs.includes(slug), `Missing required topic slug: ${slug}`);
  }

  // Verify full educational content completeness for every topic
  for (const topic of DSA_CURRICULUM) {
    assert.ok(topic.title.length > 0, `Topic ${topic.slug} missing title`);
    assert.ok(topic.shortDescription.length > 0, `Topic ${topic.slug} missing shortDescription`);
    assert.ok(topic.lesson, `Topic ${topic.slug} missing lesson object`);

    const { lesson } = topic;
    // 1. Beginner-friendly explanation
    assert.ok(lesson.explanation.length > 50, `Topic ${topic.slug} explanation too short`);
    // 2. Real-world analogy
    assert.ok(lesson.analogy.length > 30, `Topic ${topic.slug} missing real-world analogy`);
    // 3. Step-by-step dry run
    assert.ok(lesson.dryRunMarkdown.length > 50, `Topic ${topic.slug} missing step-by-step dry run`);
    // 4. Code in 4 languages
    assert.ok(lesson.codeSnippets.cpp.length > 20, `Topic ${topic.slug} missing C++ code`);
    assert.ok(lesson.codeSnippets.java.length > 20, `Topic ${topic.slug} missing Java code`);
    assert.ok(lesson.codeSnippets.python.length > 20, `Topic ${topic.slug} missing Python code`);
    assert.ok(lesson.codeSnippets.javascript.length > 20, `Topic ${topic.slug} missing JS code`);
    // 5. Time and space complexity
    assert.ok(lesson.timeComplexity.length > 5, `Topic ${topic.slug} missing timeComplexity`);
    assert.ok(lesson.spaceComplexity.length > 5, `Topic ${topic.slug} missing spaceComplexity`);
    // 6. Common mistakes
    assert.ok(lesson.commonMistakes.length >= 1, `Topic ${topic.slug} missing common mistakes`);
    // 7. Interview questions
    assert.ok(lesson.interviewQuestions.length >= 1, `Topic ${topic.slug} missing interview questions`);
    // 8. Practice exercises
    assert.ok(lesson.practiceExercises.length >= 1, `Topic ${topic.slug} missing practice exercises`);
    // 9. Revision notes and quizzes
    assert.ok(lesson.revisionNotes.length > 20, `Topic ${topic.slug} missing revision notes`);
    assert.ok(lesson.quizQuestions.length >= 1, `Topic ${topic.slug} missing quiz questions`);
    for (const q of lesson.quizQuestions) {
      assert.ok(q.options.length >= 2, `Quiz question ${q.id} must have >= 2 options`);
      assert.ok(q.correctIndex >= 0 && q.correctIndex < q.options.length, `Invalid correctIndex for ${q.id}`);
      assert.ok(q.explanation.length > 10, `Quiz question ${q.id} missing explanation`);
    }
  }
});

test('DSA Practice Problems: Multi-difficulty and test case specifications', () => {
  assert.ok(DSA_PRACTICE_PROBLEMS.length >= 7, 'Expected at least 7 practice problems');

  const difficulties = new Set(DSA_PRACTICE_PROBLEMS.map((p) => p.difficulty));
  assert.ok(difficulties.has('EASY'), 'Missing EASY problems');
  assert.ok(difficulties.has('MEDIUM'), 'Missing MEDIUM problems');
  assert.ok(difficulties.has('HARD'), 'Missing HARD problems');

  for (const prob of DSA_PRACTICE_PROBLEMS) {
    assert.ok(prob.testCases.length >= 2, `Problem ${prob.slug} must have >= 2 test cases`);
    const hasVisible = prob.testCases.some((tc) => !tc.isHidden);
    assert.ok(hasVisible, `Problem ${prob.slug} must have at least one visible test case`);
    assert.ok(prob.starterCode.python.length > 10, `Problem ${prob.slug} missing python starter code`);
    assert.ok(prob.starterCode.javascript.length > 10, `Problem ${prob.slug} missing JS starter code`);
  }
});

test('SSRF Guard: Prevents internal IP, loopback, private ranges, and cloud metadata access', async () => {
  const ssrf = new SSRFGuardService();

  // Test private IP checker
  assert.equal(ssrf.isPrivateOrRestrictedIp('127.0.0.1'), true, 'Loopback must be blocked');
  assert.equal(ssrf.isPrivateOrRestrictedIp('10.0.1.5'), true, 'Class A private IP must be blocked');
  assert.equal(ssrf.isPrivateOrRestrictedIp('172.16.0.1'), true, 'Class B private IP must be blocked');
  assert.equal(ssrf.isPrivateOrRestrictedIp('192.168.1.100'), true, 'Class C private IP must be blocked');
  assert.equal(ssrf.isPrivateOrRestrictedIp('169.254.169.254'), true, 'AWS/GCP metadata IP must be blocked');
  assert.equal(ssrf.isPrivateOrRestrictedIp('::1'), true, 'IPv6 loopback must be blocked');
  assert.equal(ssrf.isPrivateOrRestrictedIp('8.8.8.8'), false, 'Public IP 8.8.8.8 must be allowed');

  // Test URL validator rejects internal hostnames
  await assert.rejects(
    () => ssrf.validateUrl('http://localhost:3000/api'),
    /prohibited/i,
    'localhost must be rejected',
  );

  await assert.rejects(
    () => ssrf.validateUrl('http://169.254.169.254/latest/meta-data/'),
    /prohibited/i,
    'Cloud metadata IP must be rejected',
  );

  await assert.rejects(
    () => ssrf.validateUrl('file:///etc/passwd'),
    /protocols are permitted/i,
    'Non-HTTP protocols must be rejected',
  );
});

test('Code Sandbox Service: Blocks unsafe operations and evaluates JavaScript test cases', async () => {
  const sandbox = new CodeSandboxService();

  // 1. Dangerous code detection
  const unsafeResult = await sandbox.executeCode({
    problemSlug: 'two-sum',
    language: 'javascript',
    code: 'const cp = require("child_process"); cp.execSync("whoami");',
  });
  assert.equal(unsafeResult.status, 'COMPILATION_ERROR');
  assert.ok(unsafeResult.compileError?.includes('Security Exception'));

  // 2. Correct solution evaluation
  const correctResult = await sandbox.executeCode({
    problemSlug: 'two-sum',
    language: 'javascript',
    code: `
      function twoSum(nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
          const complement = target - nums[i];
          if (map.has(complement)) {
            return [map.get(complement), i];
          }
          map.set(nums[i], i);
        }
        return [];
      }
    `,
  });
  assert.equal(correctResult.status, 'ACCEPTED');
  assert.ok(correctResult.passedTestCases > 0);

  // 3. Wrong solution evaluation
  const wrongResult = await sandbox.executeCode({
    problemSlug: 'two-sum',
    language: 'javascript',
    code: `
      function twoSum(nums, target) {
        return [0, 0];
      }
    `,
  });
  assert.equal(wrongResult.status, 'WRONG_ANSWER');
});

test('Content Ingestion Pipeline: Editorial review and approval workflow', async () => {
  const ssrf = new SSRFGuardService();
  const ingestion = new IngestionService(ssrf);

  const initialJobs = ingestion.listJobs();
  assert.ok(initialJobs.length > 0, 'Should have initial seeded ingestion job');

  const sampleJob = initialJobs[0]!;
  assert.ok(sampleJob.extractedHeadings.length > 0);
  assert.ok(sampleJob.auditLog.length > 0);

  // Review job with approval
  const { job, publishedResource } = ingestion.reviewJob(
    sampleJob.id,
    {
      action: 'APPROVE',
      editorialNotes: 'Approved for System Atlas curriculum citation.',
      targetModule: 'SYSTEM_DESIGN',
      verifiedLicense: 'CC-BY-SA 4.0',
    },
    'chief-editor@system-atlas.io',
  );

  assert.equal(job.status, 'APPROVED');
  assert.equal(job.reviewedBy, 'chief-editor@system-atlas.io');
  assert.ok(publishedResource, 'Approved job must generate published resource');
  assert.equal(publishedResource?.status, 'PUBLISHED');
  assert.equal(publishedResource?.license, 'CC-BY-SA 4.0');
});
