import { Injectable, NotFoundException } from '@nestjs/common';
import { DSA_CURRICULUM, DSA_PRACTICE_PROBLEMS, DSATopicData, DSAPracticeProblem } from '@system-atlas/contracts';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DSAService {
  constructor(private prisma?: PrismaService) {}

  getAllTopics(): Array<Omit<DSATopicData, 'lesson'> & { lessonOverview: { slug: string; title: string; estimatedMinutes: number } }> {
    return DSA_CURRICULUM.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      shortDescription: topic.shortDescription,
      order: topic.order,
      level: topic.level,
      icon: topic.icon,
      prerequisites: topic.prerequisites,
      lessonOverview: {
        slug: topic.lesson.slug,
        title: topic.lesson.title,
        estimatedMinutes: topic.lesson.estimatedMinutes,
      },
    }));
  }

  getTopicBySlug(slug: string): DSATopicData {
    const topic = DSA_CURRICULUM.find((t) => t.slug === slug);
    if (!topic) {
      throw new NotFoundException(`DSA topic with slug "${slug}" not found.`);
    }
    return topic;
  }

  getPracticeProblems(query?: { topicSlug?: string; difficulty?: string }): DSAPracticeProblem[] {
    let list = [...DSA_PRACTICE_PROBLEMS];
    if (query?.topicSlug) {
      list = list.filter((p) => p.topicSlug === query.topicSlug);
    }
    if (query?.difficulty) {
      list = list.filter((p) => p.difficulty === query.difficulty);
    }
    return list;
  }

  getPracticeProblemBySlug(slug: string): DSAPracticeProblem {
    const problem = DSA_PRACTICE_PROBLEMS.find((p) => p.slug === slug);
    if (!problem) {
      throw new NotFoundException(`DSA problem with slug "${slug}" not found.`);
    }
    return problem;
  }
}
