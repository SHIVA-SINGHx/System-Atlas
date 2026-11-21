import { Topic, Lesson, DSAPracticeProblem } from './index';

export interface DSATopicData {
  slug: string;
  title: string;
  shortDescription: string;
  order: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  icon: string;
  prerequisites: string[];
  lesson: {
    slug: string;
    title: string;
    description: string;
    estimatedMinutes: number;
    explanation: string;
    analogy: string;
    dryRunMarkdown: string;
    codeSnippets: {
      cpp: string;
      java: string;
      python: string;
      javascript: string;
    };
    timeComplexity: string;
    spaceComplexity: string;
    commonMistakes: string[];
    interviewQuestions: Array<{
      question: string;
      answer: string;
      companies: string[];
      difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    }>;
    practiceExercises: Array<{
      title: string;
      slug: string;
      description: string;
      difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
      hint?: string;
    }>;
    revisionNotes: string;
    quizQuestions: Array<{
      id: string;
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }>;
  };
}

export const DSA_CURRICULUM: DSATopicData[] = [
  {
    slug: 'arrays-and-strings',
    title: 'Arrays and Strings',
    shortDescription: 'Contiguous memory layout, two-pointer traversals, prefix sums, and sliding window string manipulation.',
    order: 1,
    level: 'BEGINNER',
    icon: 'Columns3',
    prerequisites: ['Basic Programming Syntax'],
    lesson: {
      slug: 'arrays-and-strings-mastery',
      title: 'Arrays and Strings: Foundations and Techniques',
      description: 'Master contiguous memory addressing, random access, dynamic array resizing, in-place string manipulation, and prefix sum calculations.',
      estimatedMinutes: 25,
      explanation: `An Array is a collection of items stored at contiguous memory locations. Because elements are adjacent in physical memory, accessing an element by index takes deterministic O(1) time via base address pointer arithmetic: Address(A[i]) = BaseAddress + i * sizeof(Element).

Strings in modern languages are either contiguous sequences of bytes (UTF-8 in Go/Rust) or UTF-16 code units (Java/JavaScript). Understanding string mutability is paramount: in Java and Python, strings are immutable; appending to a string in a loop without StringBuilder creates quadratic O(n²) allocations.

Core algorithmic patterns on arrays and strings:
1. Two Pointers: Converging from both ends (e.g. palindrome check, two sum in sorted array) or fast/slow pointers.
2. Prefix Sums: Precomputing cumulative sums P[i] = P[i-1] + A[i] to answer range sum queries Q(L, R) in O(1) time.
3. In-Place Compaction: Removing duplicates or filtering elements without auxiliary arrays.`,
      analogy: `Think of an array as a numbered row of post office boxes (Boxes 0 to N-1) aligned side-by-side along a wall.
- To access Box #47, you do not need to walk past Box 0 through 46; you take one calculated step directly to Box 47 in constant O(1) time.
- However, if you want to insert a brand-new box at Position 2, every box from Position 2 to the end must physically slide down by one slot to make room — an O(n) operation.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: In-Place Array Reversal (Two Pointers)
Target: Reverse array \`A = [10, 20, 30, 40, 50]\`

| Step | Left Ptr | Right Ptr | Elements Swapped | Array State | Explanation |
|:---|:---|:---|:---|:---|:---|
| 0 | 0 (\`10\`) | 4 (\`50\`) | Initial | \`[10, 20, 30, 40, 50]\` | Pointers initialized at boundaries |
| 1 | 0 (\`10\`) | 4 (\`50\`) | Swap \`A[0]\` and \`A[4]\` | \`[50, 20, 30, 40, 10]\` | Swap elements; \`left++\`, \`right--\` |
| 2 | 1 (\`20\`) | 3 (\`40\`) | Swap \`A[1]\` and \`A[3]\` | \`[50, 40, 30, 20, 10]\` | Swap elements; \`left++\`, \`right--\` |
| 3 | 2 (\`30\`) | 2 (\`30\`) | None | \`[50, 40, 30, 20, 10]\` | \`left == right\`, termination condition met |

Total operations: \`floor(N/2)\` swaps. Time: O(N), Space: O(1).`,
      codeSnippets: {
        cpp: `// C++: Two-pointer reverse and prefix sum
#include <vector>
#include <string>
#include <algorithm>

void reverseArray(std::vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        std::swap(arr[left++], arr[right--]);
    }
}

std::vector<int> buildPrefixSum(const std::vector<int>& nums) {
    int n = nums.size();
    std::vector<int> prefix(n + 1, 0);
    for (int i = 0; i < n; ++i) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    return prefix; // Query sum(L..R) = prefix[R + 1] - prefix[L]
}`,
        java: `// Java: In-place reversal and Prefix Sum calculation
public class ArrayTechniques {
    public static void reverse(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left++] = arr[right];
            arr[right--] = temp;
        }
    }

    public static int[] buildPrefixSum(int[] nums) {
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        return prefix;
    }
}`,
        python: `# Python: Two-pointer reverse & Prefix Sum
def reverse_array(arr: list[int]) -> None:
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

def build_prefix_sum(nums: list[int]) -> list[int]:
    prefix = [0] * (len(nums) + 1)
    for i, val in enumerate(nums):
        prefix[i + 1] = prefix[i] + val
    return prefix  # range sum L..R: prefix[R + 1] - prefix[L]`,
        javascript: `// JavaScript: Two-pointer in-place reverse & Prefix Sum
function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}

function buildPrefixSum(nums) {
  const prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }
  return prefix;
}`,
      },
      timeComplexity: 'Access: O(1), Search: O(N), Insert: O(N), Delete: O(N). Prefix range sum query: O(1) after O(N) precomputation.',
      spaceComplexity: 'In-place two-pointer: O(1) auxiliary space. Prefix sum: O(N) auxiliary space.',
      commonMistakes: [
        'Off-by-one errors when terminating loops (using `i <= arr.length` instead of `i < arr.length`).',
        'Concatenating immutable strings in a loop (`s += ch`), triggering O(N²) memory churn instead of using `StringBuilder` or list join.',
        'Index out of bounds when looking ahead (`arr[i + 1]`) without guarding `i < arr.length - 1`.',
      ],
      interviewQuestions: [
        {
          question: 'How do you find the contiguous subarray with the largest sum (Kadane’s Algorithm)?',
          answer: 'Maintain `currentSum = max(nums[i], currentSum + nums[i])` and `maxSum = max(maxSum, currentSum)`. This computes the optimal subarray in a single pass of O(N) time and O(1) space.',
          companies: ['Google', 'Amazon', 'Microsoft'],
          difficulty: 'INTERMEDIATE',
        },
        {
          question: 'How does dynamic array resizing (amortized O(1)) work in C++ std::vector or Python list?',
          answer: 'When capacity is exhausted, the array allocates a new buffer of 2x (or 1.5x) capacity, copies all elements over, and frees old storage. Even though resizing takes O(N), it occurs infrequently enough that N inserts cost ~2N operations, yielding O(1) amortized cost per insert.',
          companies: ['Meta', 'Apple'],
          difficulty: 'BEGINNER',
        },
      ],
      practiceExercises: [
        {
          title: 'Two Sum II - Input Array Is Sorted',
          slug: 'two-sum-sorted',
          description: 'Given a 1-indexed sorted array of integers, find two numbers such that they add up to a specific target.',
          difficulty: 'BEGINNER',
          hint: 'Use two pointers starting at opposite ends. If sum < target, increment left; if sum > target, decrement right.',
        },
        {
          title: 'Maximum Subarray (Kadane’s)',
          slug: 'maximum-subarray',
          description: 'Find the subarray within an array of numbers which has the largest sum.',
          difficulty: 'INTERMEDIATE',
          hint: 'Decide at each element whether to add it to existing running sum or restart a new subarray from it.',
        },
      ],
      revisionNotes: `• Random access takes O(1) because memory is contiguous: Address = Base + i * Size.
• String mutations are costly in Java/Python: always prefer StringBuilder or join().
• Two-pointer converging pattern runs in O(N) time with O(1) auxiliary space.
• Prefix sums allow answering any range sum query in O(1) time.`,
      quizQuestions: [
        {
          id: 'arr-1',
          question: 'What is the time complexity of inserting an element at index 0 of an array of length N?',
          options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
          correctIndex: 2,
          explanation: 'All N existing elements must be shifted one position to the right to make room at index 0, requiring O(N) operations.',
        },
        {
          id: 'arr-2',
          question: 'Why does doubling the array capacity upon exhaustion ensure amortized O(1) insertion?',
          options: [
            'Because memory is freed automatically',
            'Because the total reallocation work across N insertions forms a geometric series summing to ~2N',
            'Because the compiler vectorizes the copy loop',
            'Because hash tables are used underneath',
          ],
          correctIndex: 1,
          explanation: 'Summing 1 + 2 + 4 + 8 + ... + N gives approximately 2N copy operations across N insertions, which averages to O(1) per insert.',
        },
      ],
    },
  },
  {
    slug: 'hashing',
    title: 'Hashing',
    shortDescription: 'Hash functions, collision resolution via chaining and open addressing, load factors, and amortized O(1) lookups.',
    order: 2,
    level: 'BEGINNER',
    icon: 'Hash',
    prerequisites: ['Arrays and Strings'],
    lesson: {
      slug: 'hashing-and-hash-tables',
      title: 'Hashing: Architecture, Collisions, and Applications',
      description: 'Master hash tables, hash functions, separate chaining, open addressing, load factor rehashing, and frequency map patterns.',
      estimatedMinutes: 20,
      explanation: `A Hash Table maps keys to values using a Hash Function: Index = hash(key) % BucketCapacity.
Under uniform distribution, hash table operations (Insert, Find, Delete) average O(1) time.

However, by the Pigeonhole Principle, collisions are inevitable when the number of possible keys exceeds bucket count. Two primary collision resolution techniques:
1. Separate Chaining: Each bucket holds a linked list (or balanced red-black tree in Java 8+ HashMap when bucket size exceeds 8) of colliding entries.
2. Open Addressing: All elements reside directly in the table. Upon collision, the table probes for the next available slot:
   - Linear Probing: index = (hash + i) % capacity (susceptible to primary clustering).
   - Quadratic Probing: index = (hash + c1*i + c2*i²) % capacity.
   - Double Hashing: index = (hash1 + i * hash2) % capacity.

Load Factor (α = N / Capacity): When α exceeds a threshold (typically 0.75), the table rehashes into a buffer of 2x capacity to preserve O(1) operations.`,
      analogy: `Think of a coat check room with 100 numbered hooks.
- When you arrive with a coat, the attendant applies a rule (e.g., take the last 2 digits of your phone number) to assign your hook.
- If two patrons share the same last 2 digits (collision), the attendant can either hang both coats on multiple hangers on that same hook (Separate Chaining) or place the second coat onto the next empty hook (Open Addressing).`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Hash Table with Linear Probing
Capacity = 5. Hash function: \`h(key) = key % 5\`.
Insert sequence: \`[12, 17, 22, 7]\`

| Operation | Key | \`h(key) = key % 5\` | Probe Sequence | Table State \`[0..4]\` | Explanation |
|:---|:---|:---|:---|:---|:---|
| Insert | 12 | 2 | Index 2 | \`[_, _, 12, _, _]\` | Slot 2 empty, placed immediately |
| Insert | 17 | 2 | Index 2 -> 3 | \`[_, _, 12, 17, _]\` | Collision at 2; probed slot 3 (empty) |
| Insert | 22 | 2 | Index 2 -> 3 -> 4 | \`[_, _, 12, 17, 22]\` | Collisions at 2 and 3; placed at slot 4 |
| Insert | 7 | 2 | 2 -> 3 -> 4 -> 0 | \`[7, _, 12, 17, 22]\` | Wrapped around to index 0 (empty) |

Notice the clustering effect: inserting consecutive keys mapping to bucket 2 cascades into subsequent slots.`,
      codeSnippets: {
        cpp: `// C++: Frequency counter using std::unordered_map
#include <unordered_map>
#include <vector>

std::unordered_map<int, int> countFrequencies(const std::vector<int>& nums) {
    std::unordered_map<int, int> freq;
    for (int num : nums) {
        freq[num]++;
    }
    return freq;
}`,
        java: `// Java: Two Sum using HashMap for O(n) lookup
import java.util.HashMap;
import java.util.Map;

public class HashTechniques {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
        python: `# Python: Two Sum using dictionary (Hash Map)
def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        javascript: `// JavaScript: Fast frequency map using Map
function countFrequencies(items) {
  const map = new Map();
  for (const item of items) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  return map;
}`,
      },
      timeComplexity: 'Average: Insert O(1), Lookup O(1), Delete O(1). Worst case (all keys collide into same bucket): O(N).',
      spaceComplexity: 'O(N) to store N key-value pairs and bucket structures.',
      commonMistakes: [
        'Mutating an object after using it as a key in a hash map, which alters its hash code and makes it unreachable.',
        'Assuming iteration order of a hash map is guaranteed (use LinkedHashMap or Map in JS for insertion order).',
        'Not accounting for worst-case O(N) hash attacks when designing security-critical APIs.',
      ],
      interviewQuestions: [
        {
          question: 'What happens when the load factor of a hash table becomes too high?',
          answer: 'The number of collisions increases dramatically, degrading average search from O(1) toward O(N). The hash table triggers rehashing: creating a larger array (usually 2x) and re-inserting all keys.',
          companies: ['Amazon', 'Microsoft', 'Bloomberg'],
          difficulty: 'INTERMEDIATE',
        },
        {
          question: 'Why did Java 8 replace linked lists with Red-Black trees in HashMap buckets?',
          answer: 'When a bucket accumulates more than 8 elements, the linked list is converted to a Red-Black tree. This guarantees O(log K) worst-case lookup instead of O(K), protecting against denial-of-service hash collision attacks.',
          companies: ['Oracle', 'Google'],
          difficulty: 'ADVANCED',
        },
      ],
      practiceExercises: [
        {
          title: 'Group Anagrams',
          slug: 'group-anagrams',
          description: 'Given an array of strings, group the anagrams together using sorted string or character frequency as key.',
          difficulty: 'INTERMEDIATE',
          hint: 'Use the sorted version of each string or a 26-element character count tuple as the hash map key.',
        },
      ],
      revisionNotes: `• Average lookup is O(1); worst case is O(N) if all keys hash to the same bucket.
• Separate chaining handles collisions via linked lists or balanced trees per bucket.
• Open addressing handles collisions by probing adjacent empty slots.
• Rehash occurs when load factor N / Capacity exceeds threshold (typically 0.75).`,
      quizQuestions: [
        {
          id: 'hash-1',
          question: 'What is the primary cause of clustering in Open Addressing with Linear Probing?',
          options: [
            'Garbage collection pauses',
            'Consecutive occupied slots increase the probability that incoming collisions land in the same cluster',
            'Too few linked lists allocated',
            'Incorrect integer bitwise shifting',
          ],
          correctIndex: 1,
          explanation: 'In linear probing, any key that hashes anywhere into an existing contiguous block of occupied slots must probe all the way to the end of the block, continually growing it.',
        },
      ],
    },
  },
  {
    slug: 'two-pointers-and-sliding-window',
    title: 'Two Pointers and Sliding Window',
    shortDescription: 'In-place array scanning, fast-and-slow runners, expanding/contracting window bounds for optimal subarray queries.',
    order: 3,
    level: 'BEGINNER',
    icon: 'Split',
    prerequisites: ['Arrays and Strings'],
    lesson: {
      slug: 'two-pointers-and-sliding-window-guide',
      title: 'Two Pointers and Sliding Window: Mastery of Subarray Problems',
      description: 'Master fixed and dynamic sliding window templates, fast/slow pointer cycles, and bidirectional pointer convergence.',
      estimatedMinutes: 25,
      explanation: `The Two Pointers technique reduces quadratic brute-force O(N²) pair searches to linear O(N) by exploiting problem monotonicity (such as sorted order).

Three fundamental variations:
1. Opposite Direction (Converging): Left starts at 0, Right starts at N-1. Move inwards based on condition (e.g. Container With Most Water, 2Sum sorted).
2. Same Direction (Fast & Slow): Slow moves selectively while Fast scans ahead (e.g. remove duplicates in-place, cycle detection).
3. Sliding Window (Subarrays/Substrings):
   - Fixed Window: Window size K remains constant. Shift by adding incoming element at \`right\` and subtracting outgoing element at \`left = right - K\`.
   - Dynamic Window: Expand \`right\` pointer until condition is met. Then contract \`left\` pointer while condition remains valid to find the minimum/maximum length.`,
      analogy: `Imagine looking at a panoramic landscape through an adjustable camera viewfinder.
- To find the shortest frame containing 3 mountain peaks (dynamic window), you slide the right frame border to the right until you capture 3 peaks.
- Next, you tighten the shot by sliding the left frame border rightward as much as possible without losing any of the 3 peaks.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Minimum Size Subarray Sum
Target Sum \`S = 7\`. Array: \`nums = [2, 3, 1, 2, 4, 3]\`

| Step | Left | Right | Element Added/Removed | Running Window Sum | Min Length | Explanation |
|:---|:---|:---|:---|:---|:---|:---|
| 1 | 0 | 0 | \`+ nums[0] (2)\` | 2 | ∞ | Sum < 7, expand right |
| 2 | 0 | 1 | \`+ nums[1] (3)\` | 5 | ∞ | Sum < 7, expand right |
| 3 | 0 | 2 | \`+ nums[2] (1)\` | 6 | ∞ | Sum < 7, expand right |
| 4 | 0 | 3 | \`+ nums[3] (2)\` | 8 | 4 (\`len = 3-0+1\`) | Sum ≥ 7! Contract left |
| 5 | 1 | 3 | \`- nums[0] (2)\` | 6 | 4 | Sum dropped to 6 < 7. Expand right |
| 6 | 1 | 4 | \`+ nums[4] (4)\` | 10 | 4 | Sum ≥ 7! Contract left |
| 7 | 2 | 4 | \`- nums[1] (3)\` | 7 | 3 (\`len = 4-2+1\`) | Sum ≥ 7! Contract left again |
| 8 | 3 | 4 | \`- nums[2] (1)\` | 6 | 3 | Sum < 7. Expand right |
| 9 | 3 | 5 | \`+ nums[5] (3)\` | 9 | 3 | Sum ≥ 7! Contract left |
| 10 | 4 | 5 | \`- nums[3] (2)\` | 7 | 2 (\`len = 5-4+1\`) | Min length updated to 2 (\`[4, 3]\`) |

Result: Minimum length is 2. Notice each element is visited at most twice (once by right, once by left), yielding O(N) total time.`,
      codeSnippets: {
        cpp: `// C++: Minimum Window Substring / Dynamic Sliding Window
#include <vector>
#include <algorithm>
#include <climits>

int minSubArrayLen(int target, const std::vector<int>& nums) {
    int left = 0, currentSum = 0;
    int minLen = INT_MAX;

    for (int right = 0; right < nums.size(); ++right) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = std::min(minLen, right - left + 1);
            currentSum -= nums[left++];
        }
    }
    return minLen == INT_MAX ? 0 : minLen;
}`,
        java: `// Java: Dynamic Sliding Window
public class SlidingWindow {
    public static int minSubArrayLen(int target, int[] nums) {
        int left = 0, currentSum = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            currentSum += nums[right];
            while (currentSum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                currentSum -= nums[left++];
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`,
        python: `# Python: Dynamic Sliding Window Template
def min_sub_array_len(target: int, nums: list[int]) -> int:
    left = 0
    current_sum = 0
    min_len = float('inf')

    for right in range(len(nums)):
        current_sum += nums[right]
        while current_sum >= target:
            min_len = min(min_len, right - left + 1)
            current_sum -= nums[left]
            left += 1

    return 0 if min_len == float('inf') else int(min_len)`,
        javascript: `// JavaScript: Dynamic Sliding Window
function minSubArrayLen(target, nums) {
  let left = 0, currentSum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];
    while (currentSum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      currentSum -= nums[left++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`,
      },
      timeComplexity: 'O(N): Both left and right pointers traverse the array at most once.',
      spaceComplexity: 'O(1) auxiliary space (or O(K) where K is character set size for string windows).',
      commonMistakes: [
        'Using an `if` instead of a `while` loop when contracting the window, missing multi-step contractions.',
        'Updating the answer before shrinking or updating after shrinking incorrectly.',
        'Not checking if target condition is satisfiable at all (returning infinity instead of 0).',
      ],
      interviewQuestions: [
        {
          question: 'Why does the sliding window technique run in O(N) even though there is a nested while loop?',
          answer: 'Because the left pointer only moves forward and never resets. Across the entire execution of the outer loop, the left pointer advances at most N times total. Thus, amortized work is 2N = O(N).',
          companies: ['Meta', 'Uber', 'Microsoft'],
          difficulty: 'INTERMEDIATE',
        },
      ],
      practiceExercises: [
        {
          title: 'Longest Substring Without Repeating Characters',
          slug: 'longest-substring-no-repeat',
          description: 'Find the length of the longest substring without repeating characters.',
          difficulty: 'INTERMEDIATE',
          hint: 'Use a hash map or 128-element array to track the last seen index of each character and jump left pointer directly.',
        },
      ],
      revisionNotes: `• Both pointers move at most N steps: total runtime is O(N).
• Dynamic window: expand right until valid; shrink left while maintaining validity.
• Fixed window: window length is static; add right and drop (right - K).`,
      quizQuestions: [
        {
          id: 'sw-1',
          question: 'What property must a problem have for the sliding window technique to apply?',
          options: [
            'Negative numbers must exist',
            'Monotonicity: expanding the window only increases (or decreases) the target metric monotonically',
            'The input array must already be sorted in descending order',
            'The elements must be prime numbers',
          ],
          correctIndex: 1,
          explanation: 'Sliding window relies on monotonicity so that expanding right always increases the metric and shrinking left always decreases it (or vice versa).',
        },
      ],
    },
  },
  {
    slug: 'linked-lists',
    title: 'Linked Lists',
    shortDescription: 'Node pointer manipulation, singly and doubly linked chains, sentinel dummy nodes, and in-place list reversal.',
    order: 4,
    level: 'BEGINNER',
    icon: 'Link2',
    prerequisites: ['Arrays and Strings'],
    lesson: {
      slug: 'linked-lists-in-depth',
      title: 'Linked Lists: Pointers, Memory, and Algorithms',
      description: 'Master singly and doubly linked lists, pointer rewiring, sentinel dummy nodes, fast/slow cycle detection, and list reversal.',
      estimatedMinutes: 20,
      explanation: `A Linked List is a linear data structure where elements are not stored contiguously in memory. Instead, each Node contains data and a reference (pointer) to the next node.

Key advantages:
- O(1) insertion and deletion at known pointer locations without shifting remaining elements.
- Dynamic size with no pre-allocated memory overhead.

Disadvantages:
- No O(1) random access: traversing to index k requires O(k) pointer dereferences.
- Cache locality is poor due to heap fragmentation.
- Extra memory per node for pointer references.

Essential Patterns:
1. Sentinel (Dummy) Node: Prepending a temporary dummy node before \`head\` eliminates special casing when inserting or deleting the head itself.
2. Fast and Slow Pointers (Floyd’s Cycle Detection): Slow advances 1 step, Fast advances 2 steps. If a cycle exists, they will collide in O(N) time.
3. In-Place Reversal: Iteratively redirecting \`curr.next = prev\` using three pointers (\`prev\`, \`curr\`, \`nextTemp\`).`,
      analogy: `Think of a linked list as a treasure hunt with clues.
- Each clue box contains an item AND a slip of paper with GPS coordinates pointing to the next clue box somewhere else in the city.
- You cannot teleport directly to Clue #7; you must visit Clue 1, 2, 3... in sequence to reach it.
- To insert a new clue between Clue 2 and 3, you only rewrite the coordinates in Clue 2 to point to your new clue, and write Clue 3's coordinates into your new clue.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: In-Place Singly Linked List Reversal
Input List: \`1 -> 2 -> 3 -> NULL\`

| Step | \`prev\` | \`curr\` | \`nextTemp\` | Pointer Rewiring Action | List State |
|:---|:---|:---|:---|:---|:---|
| Init | \`NULL\` | \`1\` | - | Initial state | \`1 -> 2 -> 3 -> NULL\` |
| 1 | \`NULL\` | \`1\` | \`2\` | \`curr.next = prev\` (\`1 -> NULL\`); advance pointers | \`prev = 1\`, \`curr = 2\` |
| 2 | \`1\` | \`2\` | \`3\` | \`curr.next = prev\` (\`2 -> 1 -> NULL\`); advance | \`prev = 2\`, \`curr = 3\` |
| 3 | \`2\` | \`3\` | \`NULL\` | \`curr.next = prev\` (\`3 -> 2 -> 1 -> NULL\`); advance | \`prev = 3\`, \`curr = NULL\` |
| Term | \`3\` | \`NULL\` | - | Loop terminates as \`curr == NULL\`. Return \`prev\` (node 3) | \`3 -> 2 -> 1 -> NULL\` |

Total steps: N iterations. Time: O(N), Space: O(1).`,
      codeSnippets: {
        cpp: `// C++: Singly Linked List Reversal
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
        java: `// Java: Fast & Slow Pointer Cycle Detection
public class LinkedListCycle {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; }
    }

    public static boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
        python: `# Python: Sentinel Dummy Node for Node Deletion
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_elements(head: ListNode | None, val: int) -> ListNode | None:
    dummy = ListNode(0, head)
    prev, curr = dummy, head
    while curr:
        if curr.val == val:
            prev.next = curr.next
        else:
            prev = curr
        curr = curr.next
    return dummy.next`,
        javascript: `// JavaScript: Reverse Linked List in O(N) time O(1) space
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      },
      timeComplexity: 'Prepend: O(1), Append with tail: O(1), Search: O(N), Deletion with predecessor pointer: O(1).',
      spaceComplexity: 'O(1) auxiliary space for pointer manipulations.',
      commonMistakes: [
        'Losing reference to \`curr.next\` before overwriting \`curr.next = prev\`, which cuts off the remainder of the list.',
        'Null pointer dereference when accessing \`fast.next.next\` without verifying \`fast != null && fast.next != null\`.',
        'Not using a sentinel dummy node when deleting the head node.',
      ],
      interviewQuestions: [
        {
          question: 'How do you find the start node of a cycle in a linked list?',
          answer: 'Once fast and slow pointers meet at intersection node k, reset slow to head. Advance both slow and fast one step at a time; their next meeting point is mathematically proven to be the exact start of the cycle.',
          companies: ['Microsoft', 'Amazon', 'Apple'],
          difficulty: 'INTERMEDIATE',
        },
      ],
      practiceExercises: [
        {
          title: 'Reverse Linked List',
          slug: 'reverse-linked-list',
          description: 'Reverse a singly linked list iteratively in O(N) time and O(1) space.',
          difficulty: 'BEGINNER',
          hint: 'Keep track of prev, curr, and nextTemp nodes.',
        },
      ],
      revisionNotes: `• Use sentinel dummy nodes to eliminate head-modification edge cases.
• Always save curr.next into a temporary variable before mutating curr.next.
• Floyd’s Tortoise and Hare algorithm detects cycles in O(N) time with O(1) space.`,
      quizQuestions: [
        {
          id: 'll-1',
          question: 'What is the purpose of a dummy (sentinel) node when performing linked list operations?',
          options: [
            'It provides random access to elements',
            'It avoids special-case logic when inserting or deleting the head node',
            'It hashes nodes for O(1) search',
            'It prevents memory leaks in C++',
          ],
          correctIndex: 1,
          explanation: 'A dummy node ensures that every real list node (including the head) always has a valid preceding node, eliminating branch conditions for the head.',
        },
      ],
    },
  },
  {
    slug: 'stacks-and-queues',
    title: 'Stacks and Queues',
    shortDescription: 'LIFO and FIFO data structures, monotonic stacks for nearest greater element, and BFS queues.',
    order: 5,
    level: 'BEGINNER',
    icon: 'Layers',
    prerequisites: ['Linked Lists'],
    lesson: {
      slug: 'stacks-and-queues-mastery',
      title: 'Stacks and Queues: LIFO, FIFO, and Monotonic Systems',
      description: 'Master stack evaluation, balanced parentheses, circular queues, monotonic stacks, and breadth-first pipelines.',
      estimatedMinutes: 20,
      explanation: `Stacks and Queues are constrained linear data structures with specialized access protocols:
1. Stack (LIFO - Last In, First Out):
   - \`push(x)\`: O(1)
   - \`pop()\`: O(1)
   - \`peek()\`: O(1)
   - Applications: Call stack management, expression evaluation, syntax validation, back-button history.
   - Monotonic Stack Pattern: Maintaining stack elements in strictly ascending or descending order allows finding the Next Greater Element in O(N) total time.

2. Queue (FIFO - First In, First Out):
   - \`enqueue(x)\`: O(1)
   - \`dequeue()\`: O(1)
   - \`front()\`: O(1)
   - Applications: Breadth-First Search (BFS), asynchronous job queues, rate limiting token buckets.`,
      analogy: `Stack: A spring-loaded cafeteria plate dispenser. You can only place a clean plate on the very top, and patrons can only take the top plate (LIFO).
Queue: A ticket line at a cinema. The first person to step into line is the first person served at the counter (FIFO).`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Next Greater Element (Monotonic Decreasing Stack)
Array: \`[2, 1, 2, 4, 3]\`

| Step | Current Element | Stack (Indices) | Action / Comparison | Result Array |
|:---|:---|:---|:---|:---|
| 0 | 2 (idx 0) | \`[0]\` | Push index 0 | \`[-1, -1, -1, -1, -1]\` |
| 1 | 1 (idx 1) | \`[0, 1]\` | \`1 <= 2\`, push index 1 | \`[-1, -1, -1, -1, -1]\` |
| 2 | 2 (idx 2) | Pop 1; Push 2 | \`2 > 1\`: \`res[1] = 2\`. Then \`2 <= 2\`, push idx 2 | \`[-1, 2, -1, -1, -1]\` |
| 3 | 4 (idx 3) | Pop 2, Pop 0; Push 3 | \`4 > 2\`: \`res[2] = 4\`. \`4 > 2\`: \`res[0] = 4\`. Stack now \`[3]\` | \`[4, 2, 4, -1, -1]\` |
| 4 | 3 (idx 4) | \`[3, 4]\` | \`3 <= 4\`, push index 4 | \`[4, 2, 4, -1, -1]\` |
| End | - | Remaining in stack | Indices 3 and 4 have no greater element | Final: \`[4, 2, 4, -1, -1]\` |

Every index is pushed once and popped at most once: O(N) runtime.`,
      codeSnippets: {
        cpp: `// C++: Valid Parentheses using std::stack
#include <stack>
#include <string>

bool isValid(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
        java: `// Java: Monotonic Stack for Next Greater Element
import java.util.Stack;
import java.util.Arrays;

public class MonotonicStack {
    public static int[] nextGreaterElements(int[] nums) {
        int[] res = new int[nums.length];
        Arrays.fill(res, -1);
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                res[stack.pop()] = nums[i];
            }
            stack.push(i);
        }
        return res;
    }
}`,
        python: `# Python: Valid Parentheses using List as Stack
def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
        javascript: `// JavaScript: Queue using array / pointer indices
class SimpleQueue {
  constructor() {
    this.items = [];
    this.head = 0;
  }
  enqueue(val) { this.items.push(val); }
  dequeue() {
    if (this.head >= this.items.length) return null;
    return this.items[this.head++];
  }
  isEmpty() { return this.head >= this.items.length; }
}`,
      },
      timeComplexity: 'Push/Pop/Peek/Enqueue/Dequeue: O(1). Monotonic Stack processing: O(N) amortized.',
      spaceComplexity: 'O(N) in worst case for storing elements.',
      commonMistakes: [
        'Popping from an empty stack without checking \`isEmpty()\`, causing runtime exception.',
        'Using JavaScript Array \`shift()\` for a queue inside a tight loop; \`shift()\` is O(N) because it shifts all elements.',
        'Forgetting that leftover elements in the stack at the end of parentheses validation indicate unbalanced input.',
      ],
      interviewQuestions: [
        {
          question: 'How would you implement a Queue using two Stacks with amortized O(1) operations?',
          answer: 'Maintain stackIn and stackOut. For enqueue, push to stackIn. For dequeue, if stackOut is empty, pop all elements from stackIn and push them into stackOut (reversing their order). Pop from stackOut. Each element moves across stacks twice, yielding amortized O(1).',
          companies: ['Google', 'Meta', 'Amazon'],
          difficulty: 'BEGINNER',
        },
      ],
      practiceExercises: [
        {
          title: 'Valid Parentheses',
          slug: 'valid-parentheses',
          description: 'Given a string containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
          difficulty: 'BEGINNER',
          hint: 'Push closing bracket corresponding to each opening bracket. Match and pop upon closing bracket.',
        },
      ],
      revisionNotes: `• Stack: LIFO; Queue: FIFO.
• Monotonic stack tracks nearest smaller/larger elements in linear O(N) time.
• Never use unbuffered Array.shift() in performance-critical queues; use ring buffers.`,
      quizQuestions: [
        {
          id: 'sq-1',
          question: 'Why does finding the Next Greater Element for all items with a monotonic stack run in O(N) instead of O(N²)?',
          options: [
            'Because arrays are pre-sorted',
            'Each element is pushed exactly once and popped at most once',
            'Binary search is executed internally',
            'Stack accesses GPU memory',
          ],
          correctIndex: 1,
          explanation: 'Even with a while loop inside the for loop, an element can only be popped if it was previously pushed. Thus total push operations = N, total pop operations ≤ N, yielding O(2N) = O(N) total runtime.',
        },
      ],
    },
  },
  {
    slug: 'binary-search',
    title: 'Binary Search',
    shortDescription: 'Logarithmic divide-and-conquer on sorted domains, finding lower/upper bounds, and searching across answer spaces.',
    order: 6,
    level: 'BEGINNER',
    icon: 'Search',
    prerequisites: ['Arrays and Strings'],
    lesson: {
      slug: 'binary-search-mastery',
      title: 'Binary Search: Boundaries, Invariants, and Answer Spaces',
      description: 'Master binary search termination conditions, midpoint overflow prevention, lower/upper bounds, and binary search on answer spaces.',
      estimatedMinutes: 20,
      explanation: `Binary Search is an optimal search algorithm on sorted or monotonic collections that cuts the candidate search space in half with each comparison, running in O(log N) time.

Fundamental mechanics:
1. Pointers: \`low = 0\`, \`high = N - 1\`.
2. Mid calculation: \`mid = low + (high - low) / 2\` (prevents integer overflow encountered with \`(low + high) / 2\` in 32-bit signed integers).
3. Invariant:
   - If \`nums[mid] == target\`, return \`mid\`.
   - If \`nums[mid] < target\`, search right half: \`low = mid + 1\`.
   - If \`nums[mid] > target\`, search left half: \`high = mid - 1\`.

Binary Search on Answer Space:
When an optimization problem asks for the "minimum possible maximum" or "maximum possible minimum", and a feasibility function \`canAchieve(X)\` is monotonic (true, true, ..., false, false), binary search can find the exact threshold in O(K log(Range)) time (e.g. Koko Eating Bananas, Capacity to Ship Packages).`,
      analogy: `Playing the High-Low number guessing game between 1 and 100:
- You guess 50. Host says: "Too low!"
- You instantly eliminate 1 through 50. Your new range is 51 through 100.
- Next guess: 75. Host says: "Too high!"
- You eliminate 75 through 100. New range is 51 through 74.
In at most 7 guesses (\`ceil(log2(100))\`), you are mathematically guaranteed to guess the correct number.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Binary Search
Target = 23. Array = \`[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\` (Length 10)

| Step | \`low\` | \`high\` | \`mid\` | \`nums[mid]\` | Comparison | Action |
|:---|:---|:---|:---|:---|:---|:---|
| 1 | 0 | 9 | 4 | 16 | \`16 < 23\` | Target is in right half: \`low = mid + 1\` (5) |
| 2 | 5 | 9 | 7 | 56 | \`56 > 23\` | Target is in left half: \`high = mid - 1\` (6) |
| 3 | 5 | 6 | 5 | 23 | \`23 == 23\` | Target found at index 5! Return 5. |

Total comparisons: 3. (\`log2(10) ≈ 3.32\`).`,
      codeSnippets: {
        cpp: `// C++: Standard Binary Search & Lower Bound
#include <vector>

int binarySearch(const std::vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
        java: `// Java: Binary Search on Answer Space (Capacity to Ship)
public class BinarySearchAnswer {
    public static int shipWithinDays(int[] weights, int days) {
        int low = 0, high = 0;
        for (int w : weights) {
            low = Math.max(low, w);
            high += w;
        }
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (canShip(weights, days, mid)) {
                high = mid; // Try smaller capacity
            } else {
                low = mid + 1; // Need larger capacity
            }
        }
        return low;
    }

    private static boolean canShip(int[] weights, int days, int cap) {
        int d = 1, current = 0;
        for (int w : weights) {
            if (current + w > cap) {
                d++;
                current = 0;
            }
            current += w;
        }
        return d <= days;
    }
}`,
        python: `# Python: Finding Leftmost Insertion Index (bisect_left)
def binary_search_leftmost(nums: list[int], target: int) -> int:
    low, high = 0, len(nums)
    while low < high:
        mid = low + (high - low) // 2
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid
    return low`,
        javascript: `// JavaScript: Clean Binary Search
function binarySearch(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      },
      timeComplexity: 'Time: O(log N). Space: O(1) iterative (O(log N) if recursive call stack used).',
      spaceComplexity: 'O(1) auxiliary space.',
      commonMistakes: [
        'Integer overflow writing \`(low + high) / 2\` in languages with fixed integer bit widths.',
        'Infinite loop caused by setting \`low = mid\` or \`high = mid\` inside a \`while (low <= high)\` loop.',
        'Not handling boundary index conditions when target is outside array range.',
      ],
      interviewQuestions: [
        {
          question: 'How do you search an element in a rotated sorted array in O(log N) time?',
          answer: 'At any midpoint, at least one half of the array (left or right) is guaranteed to be normally sorted. Check if target lies within the boundaries of the sorted half; if so, search there, otherwise search the opposing half.',
          companies: ['Google', 'Meta', 'Amazon', 'LinkedIn'],
          difficulty: 'INTERMEDIATE',
        },
      ],
      practiceExercises: [
        {
          title: 'Search in Rotated Sorted Array',
          slug: 'search-rotated-array',
          description: 'Search target in sorted array rotated at an unknown pivot index in O(log N) time.',
          difficulty: 'INTERMEDIATE',
          hint: 'Determine which half is sorted by comparing nums[low] and nums[mid].',
        },
      ],
      revisionNotes: `• Time complexity is O(log N). Space is O(1).
• Always calculate mid as: low + (high - low) / 2.
• Binary search applies to any monotonic domain, not just sorted arrays.`,
      quizQuestions: [
        {
          id: 'bs-1',
          question: 'For an array of 1,000,000 sorted elements, what is the maximum number of iterations binary search will perform?',
          options: ['1,000', '20', '100', '500'],
          correctIndex: 1,
          explanation: '2^20 = 1,048,576. Since 1,000,000 < 2^20, binary search will terminate in at most 20 comparisons.',
        },
      ],
    },
  },
  {
    slug: 'recursion-and-backtracking',
    title: 'Recursion and Backtracking',
    shortDescription: 'State space trees, base cases, call stacks, permutation/combination generation, and pruning.',
    order: 7,
    level: 'INTERMEDIATE',
    icon: 'Workflow',
    prerequisites: ['Stacks and Queues'],
    lesson: {
      slug: 'recursion-and-backtracking-guide',
      title: 'Recursion and Backtracking: State Space Trees and Pruning',
      description: 'Master the anatomy of recursive functions, call stack frames, state-space exploration, and backtrack pruning strategies.',
      estimatedMinutes: 25,
      explanation: `Recursion is a programming technique where a function calls itself to solve smaller subproblems of the same type.
Every recursive algorithm requires:
1. Base Case: The condition under which the function returns without further recursive calls (prevents infinite recursion and call stack overflow).
2. Recursive Step: Decomposing the input into smaller subproblems and moving toward the base case.

Backtracking is a systematic, depth-first exploration of a combinatorial state space tree:
1. Choose: Make a candidate move (add element to path, place queen, select digit).
2. Explore: Recurse down the decision tree.
3. Unchoose (Backtrack): Undo the candidate move (pop from path, remove queen) so other branches can explore their possibilities cleanly.
4. Pruning: Terminating branches early when a constraint is violated, avoiding wasteful exploration of entire exponential subtrees.`,
      analogy: `Imagine exploring a hedge maze with a spool of colored thread:
- At every fork in the path (decision point), you tie off a knot and choose the leftmost turn (choose & explore).
- If you hit a brick dead end, you rewind your thread back to the last fork (backtrack / unchoose) and try the next path.
- Once you reach the exit (base case), you record the solved path!`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Subsets (Power Set) Generation
Array: \`[1, 2]\`

\`\`\`
State Space Tree:
                 []
              /      \\
         +1 [1]        []
           /   \\      /  \\
     +2 [1,2]  [1]  +2 [2] []
\`\`\`

| Call | Current Index | Current Path | Action Taken | Result Collected |
|:---|:---|:---|:---|:---|
| \`dfs(0)\` | 0 | \`[]\` | Save \`[]\`; branch 1: include 1 | \`[[]]\` |
| \`dfs(1)\` | 1 | \`[1]\` | Save \`[1]\`; branch 2: include 2 | \`[[], [1]]\` |
| \`dfs(2)\` | 2 | \`[1, 2]\` | Save \`[1, 2]\`; base case \`i == 2\` return | \`[[], [1], [1, 2]]\` |
| Backtrack | 1 | \`[1]\` | Pop 2; branch: exclude 2 | - |
| Backtrack | 0 | \`[]\` | Pop 1; branch: exclude 1 | - |
| \`dfs(1)\` | 1 | \`[2]\` | Save \`[2]\`; branch 2: include 2 | \`[[], [1], [1, 2], [2]]\` |

Total subsets for N=2 is 2² = 4.`,
      codeSnippets: {
        cpp: `// C++: Generate All Permutations
#include <vector>
#include <algorithm>

void backtrack(std::vector<int>& nums, int start, std::vector<std::vector<int>>& result) {
    if (start == nums.size()) {
        result.push_back(nums);
        return;
    }
    for (int i = start; i < nums.size(); ++i) {
        std::swap(nums[start], nums[i]);
        backtrack(nums, start + 1, result);
        std::swap(nums[start], nums[i]); // Backtrack
    }
}

std::vector<std::vector<int>> permute(std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    backtrack(nums, 0, result);
    return result;
}`,
        java: `// Java: Subsets Generation with Backtracking
import java.util.ArrayList;
import java.util.List;

public class BacktrackingSubsets {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int start, int[] nums, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current));
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(i + 1, nums, current, result);
            current.remove(current.size() - 1); // Backtrack undo
        }
    }
}`,
        python: `# Python: N-Queens Backtracking with Column & Diagonal Sets
def solve_n_queens(n: int) -> list[list[str]]:
    results = []
    cols = set()
    pos_diag = set() # r + c
    neg_diag = set() # r - c
    board = [["."] * n for _ in range(n)]

    def backtrack(r: int):
        if r == n:
            results.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                continue
            cols.add(c); pos_diag.add(r + c); neg_diag.add(r - c)
            board[r][c] = "Q"
            backtrack(r + 1)
            cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c)
            board[r][c] = "."

    backtrack(0)
    return results`,
        javascript: `// JavaScript: Combination Sum Backtracking
function combinationSum(candidates, target) {
  const result = [];
  function backtrack(start, remain, path) {
    if (remain === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remain) continue;
      path.push(candidates[i]);
      backtrack(i, remain - candidates[i], path);
      path.pop(); // Backtrack
    }
  }
  backtrack(0, target, []);
  return result;
}`,
      },
      timeComplexity: 'Permutations: O(N * N!). Subsets: O(N * 2^N). N-Queens: O(N!).',
      spaceComplexity: 'O(N) recursion stack depth.',
      commonMistakes: [
        'Forgetting to undo state changes (e.g. \`path.pop()\`), corrupting state for sibling branches.',
        'Adding mutable references directly to results list (e.g. \`result.add(current)\` instead of \`result.add(new ArrayList<>(current))\`).',
        'Missing base cases, causing stack overflow (RecursionError / Maximum call stack exceeded).',
      ],
      interviewQuestions: [
        {
          question: 'What is pruning in backtracking and why is it essential?',
          answer: 'Pruning checks constraints at the current node before recurring. If the partial state cannot possibly lead to a valid solution, recursion down that branch is aborted, cutting off exponential numbers of invalid candidate evaluations.',
          companies: ['Google', 'Meta', 'Amazon'],
          difficulty: 'INTERMEDIATE',
        },
      ],
      practiceExercises: [
        {
          title: 'Subsets',
          slug: 'subsets',
          description: 'Given an integer array nums of unique elements, return all possible subsets (the power set).',
          difficulty: 'INTERMEDIATE',
          hint: 'At each index, you either include nums[i] or omit it, then recurse on index + 1.',
        },
      ],
      revisionNotes: `• Backtracking follows: Choose -> Explore -> Unchoose.
• Always pass deep copies of partial solutions into result containers.
• Prune invalid branches as early as possible.`,
      quizQuestions: [
        {
          id: 'rec-1',
          question: 'Why must we make a copy of the path when appending it to the result list in backtracking?',
          options: [
            'Because arrays are immutable',
            'Because the same path instance will be modified as subsequent steps pop and push elements',
            'To trigger garbage collection',
            'To sort the elements',
          ],
          correctIndex: 1,
          explanation: 'Since the path list is mutated during backtracking, adding its reference directly will leave all entries in the final result reflecting the final (empty) state of the list.',
        },
      ],
    },
  },
  {
    slug: 'trees-and-bst',
    title: 'Trees and Binary Search Trees',
    shortDescription: 'Hierarchical node graphs, DFS (pre/in/post), BFS level-order, BST search property, and balanced AVL/Red-Black trees.',
    order: 8,
    level: 'INTERMEDIATE',
    icon: 'Network',
    prerequisites: ['Recursion and Backtracking', 'Stacks and Queues'],
    lesson: {
      slug: 'trees-and-bst-mastery',
      title: 'Trees and Binary Search Trees: Traversals, Invariants, and Balances',
      description: 'Master binary trees, binary search trees (BST), pre/in/post-order DFS, level-order BFS, LCA, and height balancing.',
      estimatedMinutes: 25,
      explanation: `A Tree is a hierarchical non-linear data structure consisting of nodes connected by edges, with no cycles.
A Binary Tree restricts each node to at most two children: \`left\` and \`right\`.

Binary Search Tree (BST) Invariant:
For every node X:
- All keys in X's left subtree are strictly LESS than X.val.
- All keys in X's right subtree are strictly GREATER than X.val.
Crucial Property: An In-Order Traversal (Left -> Root -> Right) of a BST visits nodes in strictly ASCENDING sorted order!

Traversals:
1. Depth-First Search (DFS):
   - Pre-order (Root -> Left -> Right): Used for serializing/cloning trees.
   - In-order (Left -> Root -> Right): Sorted traversal for BST.
   - Post-order (Left -> Right -> Root): Used for bottom-up computation (tree height, deleting tree).
2. Breadth-First Search (BFS / Level-Order):
   - Uses a FIFO queue to visit nodes level-by-level, vital for shortest distance in unweighted trees.`,
      analogy: `Think of a corporate organizational chart:
- The CEO is the Root Node.
- Vice Presidents report to the CEO (Child Nodes).
- Individual contributors with no reports are the Leaf Nodes.
- A BST is like a filing cabinet sorted so that every folder to the left comes earlier in the alphabet than the current folder tab.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: In-Order Traversal of BST
Tree Structure:
\`\`\`
       4
     /   \\
    2     6
   / \\   / \\
  1   3 5   7
\`\`\`

| Step | Node Visited | Action / Call Stack State | Output Stream |
|:---|:---|:---|:---|
| 1 | 4 | Recurse left to 2 | \`[]\` |
| 2 | 2 | Recurse left to 1 | \`[]\` |
| 3 | 1 | Left is null -> Visit 1 -> Right is null | \`[1]\` |
| 4 | 2 | Back to 2 -> Visit 2 -> Recurse right to 3 | \`[1, 2]\` |
| 5 | 3 | Left is null -> Visit 3 -> Right is null | \`[1, 2, 3]\` |
| 6 | 4 | Back to root 4 -> Visit 4 -> Recurse right to 6 | \`[1, 2, 3, 4]\` |
| 7 | 6 | Recurse left to 5 | \`[1, 2, 3, 4]\` |
| 8 | 5 | Left null -> Visit 5 -> Right null | \`[1, 2, 3, 4, 5]\` |
| 9 | 6 | Back to 6 -> Visit 6 -> Recurse right to 7 | \`[1, 2, 3, 4, 5, 6]\` |
| 10 | 7 | Left null -> Visit 7 -> Right null | \`[1, 2, 3, 4, 5, 6, 7]\` |

Result is perfectly sorted: \`[1, 2, 3, 4, 5, 6, 7]\`!`,
      codeSnippets: {
        cpp: `// C++: Maximum Depth & Lowest Common Ancestor
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + std::max(maxDepth(root->left), maxDepth(root->right));
}

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
        java: `// Java: Level-Order Traversal (BFS) using Queue
import java.util.*;

public class TreeBFS {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) return levels;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            levels.add(currentLevel);
        }
        return levels;
    }
}`,
        python: `# Python: Validate Binary Search Tree (BST Invariant)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root: TreeNode | None) -> bool:
    def validate(node, low=float('-inf'), high=float('inf')) -> bool:
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return (validate(node.left, low, node.val) and
                validate(node.right, node.val, high))

    return validate(root)`,
        javascript: `// JavaScript: In-order traversal generator
function* inOrder(root) {
  if (!root) return;
  yield* inOrder(root.left);
  yield root.val;
  yield* inOrder(root.right);
}`,
      },
      timeComplexity: 'Traversals: O(N) time visiting all N nodes. Balanced BST search: O(log N). Skewed BST search: O(N).',
      spaceComplexity: 'O(H) recursion stack where H is tree height (O(log N) balanced, O(N) worst-case skewed).',
      commonMistakes: [
        'Only checking immediate children (\`left.val < root.val < right.val\`) instead of verifying that all nodes in the left subtree are smaller than root.',
        'Forgetting that tree recursion space complexity is bounded by tree height H, not O(1).',
      ],
      interviewQuestions: [
        {
          question: 'How do you validate if a binary tree is a valid Binary Search Tree?',
          answer: 'Pass valid numeric boundaries \`(minAllowed, maxAllowed)\` down the recursion tree. For the left child, update \`maxAllowed = root.val\`. For the right child, update \`minAllowed = root.val\`. Alternatively, do an in-order traversal and verify that each visited value is strictly greater than the preceding one.',
          companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
          difficulty: 'INTERMEDIATE',
        },
      ],
      practiceExercises: [
        {
          title: 'Validate Binary Search Tree',
          slug: 'validate-bst',
          description: 'Determine if a binary tree is a valid Binary Search Tree (BST).',
          difficulty: 'INTERMEDIATE',
          hint: 'Recursively enforce low < node.val < high boundaries.',
        },
      ],
      revisionNotes: `• In-order traversal on a BST yields sorted order.
• Height of balanced binary tree is O(log N); skewed tree height is O(N).
• BFS uses a Queue; DFS uses a Call Stack.`,
      quizQuestions: [
        {
          id: 'tree-1',
          question: 'Which tree traversal visits the root node AFTER both its left and right subtrees have been visited?',
          options: ['In-order', 'Pre-order', 'Post-order', 'Level-order'],
          correctIndex: 2,
          explanation: 'Post-order traversal follows the sequence: Left Subtree -> Right Subtree -> Root Node.',
        },
      ],
    },
  },
  {
    slug: 'heaps-and-priority-queues',
    title: 'Heaps and Priority Queues',
    shortDescription: 'Complete binary tree arrays, min/max heap properties, sift-up/down operations, and Top-K elements.',
    order: 9,
    level: 'INTERMEDIATE',
    icon: 'SlidersHorizontal',
    prerequisites: ['Trees and Binary Search Trees'],
    lesson: {
      slug: 'heaps-and-priority-queues-mastery',
      title: 'Heaps and Priority Queues: Sift Operations, Top-K, and Scheduling',
      description: 'Master binary heap array representations, heapify in O(N), sift-up/sift-down operations, and top-K stream processing.',
      estimatedMinutes: 20,
      explanation: `A Binary Heap is a complete binary tree stored compactly in a contiguous array without pointers:
For node at index \`i\`:
- Parent: \`floor((i - 1) / 2)\`
- Left Child: \`2 * i + 1\`
- Right Child: \`2 * i + 2\`

Heap Invariant:
- Min-Heap: Every parent node is LESS than or equal to its children. Root is the global minimum.
- Max-Heap: Every parent node is GREATER than or equal to its children. Root is the global maximum.

Operations:
- \`push(x)\`: Append to end of array, then \`sift-up\` until parent invariant holds. O(log N) time.
- \`pop()\`: Swap root with last element, delete last element, then \`sift-down\` root until children invariant holds. O(log N) time.
- \`peek()\`: Return root element in O(1) time.
- \`heapify(arr)\`: Building a heap from an unordered array takes O(N) time bottom-up, NOT O(N log N)!`,
      analogy: `Think of an emergency room triage desk:
- Patients do not see doctors in the order they arrived (FIFO).
- Instead, incoming patients are assigned an urgency score (priority).
- The patient with the highest urgency (root of the heap) is always taken next by the available surgeon.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Min-Heap Insertion & Sift-Up
Heap currently: \`[10, 25, 15, 40, 50]\`
Insert \`5\`:

| Step | Array State | Node Index | Parent Index | Action |
|:---|:---|:---|:---|:---|
| 1 | \`[10, 25, 15, 40, 50, 5]\` | 5 (\`val = 5\`) | 2 (\`val = 15\`) | Append to end. Compare with parent: \`5 < 15\` |
| 2 | \`[10, 25, 5, 40, 50, 15]\` | 2 (\`val = 5\`) | 0 (\`val = 10\`) | Swapped with parent. Compare with root: \`5 < 10\` |
| 3 | \`[5, 25, 10, 40, 50, 15]\` | 0 (\`val = 5\`) | None | Swapped with root. \`5\` is now at index 0. Done! |

Total comparisons = tree height = \`ceil(log2(6))\` = 3.`,
      codeSnippets: {
        cpp: `// C++: Top K Frequent Elements using std::priority_queue
#include <vector>
#include <unordered_map>
#include <queue>

std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
    std::unordered_map<int, int> count;
    for (int n : nums) count[n]++;

    // Min-heap storing pairs: {frequency, element}
    std::priority_queue<std::pair<int, int>, 
                        std::vector<std::pair<int, int>>, 
                        std::greater<std::pair<int, int>>> minHeap;

    for (auto& [val, freq] : count) {
        minHeap.push({freq, val});
        if (minHeap.size() > k) minHeap.pop();
    }

    std::vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top().second);
        minHeap.pop();
    }
    return result;
}`,
        java: `// Java: PriorityQueue for Kth Largest Element
import java.util.PriorityQueue;

public class KthLargest {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}`,
        python: `# Python: Top-K using heapq
import heapq
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    # heapq.nlargest takes O(N log K)
    return [item for item, freq in heapq.nlargest(k, count.items(), key=lambda x: x[1])]`,
        javascript: `// JavaScript: Simple Min-Heap implementation
class MinHeap {
  constructor() { this.heap = []; }
  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    // sift down...
    return min;
  }
}`,
      },
      timeComplexity: 'Peek: O(1). Push: O(log N). Pop: O(log N). Heapify an array of size N: O(N).',
      spaceComplexity: 'O(N) contiguous array storage.',
      commonMistakes: [
        'Assuming elements in a heap array are sorted; only the root relationship is strictly guaranteed.',
        'Using a Max-Heap of size N for Top-K instead of a Min-Heap of size K, wasting memory and increasing runtime from O(N log K) to O(N log N).',
      ],
      interviewQuestions: [
        {
          question: 'Why does building a heap with heapify take O(N) time instead of O(N log N)?',
          answer: 'Bottom-up heapify runs sift-down on each level starting from the second-to-last level. Half the nodes are at the bottom and take 0 swaps; a quarter take 1 swap; an eighth take 2 swaps. The mathematical summation N/4 * 1 + N/8 * 2 + N/16 * 3 + ... converges to O(N).',
          companies: ['Google', 'Microsoft', 'Bloomberg'],
          difficulty: 'INTERMEDIATE',
        },
      ],
      practiceExercises: [
        {
          title: 'Kth Largest Element in an Array',
          slug: 'kth-largest-element',
          description: 'Find the kth largest element in an unsorted array using a min-heap.',
          difficulty: 'INTERMEDIATE',
          hint: 'Maintain a min-heap of size k. After processing all elements, the root of the heap is the kth largest.',
        },
      ],
      revisionNotes: `• Binary heap is stored in an array without pointers: left = 2i + 1, right = 2i + 2.
• Top-K problems are solved using a heap of size K in O(N log K) time.
• Heapify an array runs in linear O(N) time.`,
      quizQuestions: [
        {
          id: 'heap-1',
          question: 'To find the K LARGEST elements in a stream of N numbers, what heap structure should you maintain?',
          options: [
            'A Max-Heap of size N',
            'A Min-Heap of size K',
            'A binary search tree of size K',
            'A queue of size N',
          ],
          correctIndex: 1,
          explanation: 'A Min-Heap of size K holds the K largest elements seen so far at any point, with the smallest of the K largest at the root for immediate comparison in O(1).',
        },
      ],
    },
  },
  {
    slug: 'graphs',
    title: 'Graphs',
    shortDescription: 'Adjacency lists, Breadth-First Search, Depth-First Search, topological sorting, and Dijkstra shortest paths.',
    order: 10,
    level: 'INTERMEDIATE',
    icon: 'GitFork',
    prerequisites: ['Trees and Binary Search Trees', 'Heaps and Priority Queues'],
    lesson: {
      slug: 'graphs-mastery',
      title: 'Graphs: Representations, Traversals, TopoSort, and Shortest Paths',
      description: 'Master adjacency lists/matrices, BFS shortest paths in unweighted graphs, DFS cycle detection, Kahn’s topological sort, and Dijkstra’s algorithm.',
      estimatedMinutes: 30,
      explanation: `A Graph G = (V, E) consists of a set of vertices (V) and edges (E).
Representations:
1. Adjacency List: \`Map<Node, List<Node>>\`. Ideal for sparse graphs (E << V²). Space: O(V + E).
2. Adjacency Matrix: 2D array \`matrix[u][v]\`. Fast O(1) edge existence checks. Space: O(V²).

Core Graph Algorithms:
1. Breadth-First Search (BFS): Uses a FIFO queue and \`visited\` set. Finds shortest paths in unweighted graphs level by level in O(V + E).
2. Depth-First Search (DFS): Uses recursion or explicit stack. Identifies connected components, paths, and cycles in O(V + E).
3. Topological Sort (DAGs): Orders vertices such that for every directed edge u -> v, u appears before v. Implemented via Kahn's Algorithm (in-degrees + queue) or DFS post-order reverse.
4. Dijkstra’s Algorithm: Finds single-source shortest paths on graphs with non-negative edge weights using a Min-Priority Queue in O((V + E) log V).`,
      analogy: `Think of a global airline flight network:
- Airports are the Vertices (V).
- Direct flight routes between airports are the Edges (E).
- If you want the fewest flight connections between Seattle and Madrid (unweighted), use BFS.
- If you want the lowest total ticket cost or shortest flight duration (weighted), use Dijkstra's Algorithm with a priority queue.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Dijkstra’s Shortest Path
Graph:
- \`A -> B (wt 4), A -> C (wt 2)\`
- \`C -> B (wt 1), C -> D (wt 5)\`
- \`B -> D (wt 2)\`
Source = \`A\`.

| Step | Extracted Min Node | Visited Set | Distance Table (\`[A, B, C, D]\`) | Relaxation Details |
|:---|:---|:---|:---|:---|
| 0 | - | \`{}\` | \`[0, ∞, ∞, ∞]\` | Min-heap: \`{(0, A)}\` |
| 1 | \`A\` (\`dist = 0\`) | \`{A}\` | \`[0, 4, 2, ∞]\` | Relax edges from A: \`dist[B]=4\`, \`dist[C]=2\` |
| 2 | \`C\` (\`dist = 2\`) | \`{A, C}\` | \`[0, 3, 2, 7]\` | Relax from C: \`dist[B] = min(4, 2+1) = 3\`, \`dist[D] = 2+5 = 7\` |
| 3 | \`B\` (\`dist = 3\`) | \`{A, C, B}\` | \`[0, 3, 2, 5]\` | Relax from B: \`dist[D] = min(7, 3+2) = 5\` |
| 4 | \`D\` (\`dist = 5\`) | \`{A, C, B, D}\` | \`[0, 3, 2, 5]\` | All reachable nodes visited |

Final shortest path from A to D is: \`A -> C -> B -> D\` with total weight 5.`,
      codeSnippets: {
        cpp: `// C++: Dijkstra's Algorithm using priority_queue
#include <vector>
#include <queue>
#include <climits>

using Edge = std::pair<int, int>; // {neighbor, weight}

std::vector<int> dijkstra(int n, int src, const std::vector<std::vector<Edge>>& adj) {
    std::vector<int> dist(n, INT_MAX);
    // Min-heap storing {distance, node}
    std::priority_queue<Edge, std::vector<Edge>, std::greater<Edge>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue;

        for (auto& [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
        java: `// Java: Topological Sort using Kahn's Algorithm
import java.util.*;

public class CourseSchedule {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];

        for (int[] edge : prerequisites) {
            adj.get(edge[1]).add(edge[0]);
            inDegree[edge[0]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }

        int processed = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            processed++;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) queue.offer(v);
            }
        }
        return processed == numCourses;
    }
}`,
        python: `# Python: Breadth-First Search (Shortest Path in Unweighted Graph)
from collections import deque

def bfs_shortest_path(n: int, edges: list[tuple[int, int]], start: int, target: int) -> int:
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    queue = deque([(start, 0)])
    visited = {start}

    while queue:
        curr, dist = queue.popleft()
        if curr == target:
            return dist
        for neighbor in adj[curr]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))

    return -1`,
        javascript: `// JavaScript: Graph BFS
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
      },
      timeComplexity: 'BFS/DFS: O(V + E). Topological Sort: O(V + E). Dijkstra: O((V + E) log V).',
      spaceComplexity: 'O(V + E) adjacency storage and O(V) visited set / distance array.',
      commonMistakes: [
        'Running Dijkstra’s algorithm on graphs with negative edge weights (use Bellman-Ford instead).',
        'Forgetting to mark nodes as visited immediately upon enqueuing in BFS, causing multiple duplicate insertions.',
        'Not checking for cycles in topological sort.',
      ],
      interviewQuestions: [
        {
          question: 'Why does Dijkstra’s algorithm fail when negative edge weights are present?',
          answer: 'Dijkstra greedily assumes that once a node is popped from the priority queue, its shortest distance is finalized and cannot be improved. A negative edge encountered later could invalidate this assumption, requiring distance recalculations that Dijkstra does not perform.',
          companies: ['Google', 'Meta', 'Amazon', 'Uber'],
          difficulty: 'INTERMEDIATE',
        },
      ],
      practiceExercises: [
        {
          title: 'Course Schedule (Cycle Detection / TopoSort)',
          slug: 'course-schedule',
          description: 'Determine if you can finish all courses given prerequisites using Kahn’s Algorithm or DFS.',
          difficulty: 'INTERMEDIATE',
          hint: 'Build in-degree array and queue nodes with 0 in-degree.',
        },
      ],
      revisionNotes: `• Use BFS for shortest path in unweighted graphs; use Dijkstra for non-negative weighted graphs.
• Topological sort only exists on Directed Acyclic Graphs (DAGs).
• Adjacency list takes O(V + E) space; adjacency matrix takes O(V²) space.`,
      quizQuestions: [
        {
          id: 'graph-1',
          question: 'What is the runtime of Dijkstra’s algorithm implemented with a binary min-heap for a graph with V vertices and E edges?',
          options: ['O(V²)', 'O(E log V)', 'O(V * E)', 'O(V + E)'],
          correctIndex: 1,
          explanation: 'Each vertex is extracted from the min-heap once (V log V) and each edge can trigger a heap decrease-key / insertion (E log V), yielding O((V + E) log V).',
        },
      ],
    },
  },
  {
    slug: 'greedy-algorithms',
    title: 'Greedy Algorithms',
    shortDescription: 'Local optimal choices, greedy-choice property, optimal substructure, interval scheduling, and Huffman coding.',
    order: 11,
    level: 'INTERMEDIATE',
    icon: 'Sparkles',
    prerequisites: ['Arrays and Strings', 'Sorting'],
    lesson: {
      slug: 'greedy-algorithms-mastery',
      title: 'Greedy Algorithms: Local Optimums, Proofs, and Interval Scheduling',
      description: 'Master the greedy choice property, optimal substructure, exchange arguments, interval scheduling, and gas station circuits.',
      estimatedMinutes: 20,
      explanation: `A Greedy Algorithm constructs a solution step by step by always making the locally optimal choice at each stage, hoping these choices lead to a global optimum.

When Greedy Works:
1. Greedy Choice Property: A globally optimal solution can be reached by making locally optimal (greedy) choices without reconsidering previous steps.
2. Optimal Substructure: An optimal solution to the problem contains optimal solutions to subproblems.

Proving Greedy Correctness (Exchange Argument):
Assume there is an optimal solution \`OPT\` different from greedy solution \`G\`. Show that you can swap an element of \`OPT\` with the greedy choice without decreasing the solution quality. Iterating this transforms \`OPT\` into \`G\`, proving \`G\` is optimal.`,
      analogy: `Making change with standard US coins (25¢, 10¢, 5¢, 1¢):
- To make 36¢ with the fewest coins, you greedily take the largest coin that fits: 25¢ (leaving 11¢), then 10¢ (leaving 1¢), then 1¢. Total: 3 coins.
- Caution: In non-canonical coin systems (e.g. 1¢, 3¢, 4¢ to make 6¢), greedy picks 4¢ + 1¢ + 1¢ (3 coins), whereas the true optimum is 3¢ + 3¢ (2 coins)! This illustrates when Dynamic Programming is required instead.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Non-Overlapping Intervals
Intervals: \`[[1, 2], [2, 3], [3, 4], [1, 3]]\`
Greedy Strategy: Sort intervals by end time. Pick next interval that starts after or when the last chosen interval ends.

| Step | Interval | End Time | Last End | Action Taken | Current Count |
|:---|:---|:---|:---|:---|:---|
| 0 | Sort by end | - | - | Sorted: \`[[1, 2], [2, 3], [1, 3], [3, 4]]\` | - |
| 1 | \`[1, 2]\` | 2 | -∞ | Compatible! Take it. | 1 (lastEnd = 2) |
| 2 | \`[2, 3]\` | 3 | 2 | Compatible (\`start 2 >= lastEnd 2\`)! Take it. | 2 (lastEnd = 3) |
| 3 | \`[1, 3]\` | 3 | 3 | Overlap! (\`start 1 < lastEnd 3\`). Drop it. | 2 (dropped) |
| 4 | \`[3, 4]\` | 4 | 3 | Compatible (\`start 3 >= lastEnd 3\`)! Take it. | 3 (lastEnd = 4) |

Max non-overlapping intervals = 3. Intervals removed = 4 - 3 = 1.`,
      codeSnippets: {
        cpp: `// C++: Non-overlapping Intervals
#include <vector>
#include <algorithm>

int eraseOverlapIntervals(std::vector<std::vector<int>>& intervals) {
    if (intervals.empty()) return 0;
    std::sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
        return a[1] < b[1]; // Sort by end time
    });

    int count = 1;
    int lastEnd = intervals[0][1];

    for (size_t i = 1; i < intervals.size(); ++i) {
        if (intervals[i][0] >= lastEnd) {
            count++;
            lastEnd = intervals[i][1];
        }
    }
    return intervals.size() - count;
}`,
        java: `// Java: Jump Game
public class JumpGame {
    public static boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }
}`,
        python: `# Python: Gas Station Circuit (Greedy O(N))
def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    if sum(gas) < sum(cost):
        return -1
    total_tank, current_tank, start_idx = 0, 0, 0
    for i in range(len(gas)):
        current_tank += gas[i] - cost[i]
        if current_tank < 0:
            start_idx = i + 1
            current_tank = 0
    return start_idx`,
        javascript: `// JavaScript: Interval Scheduling
function intervalScheduling(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }
  return count;
}`,
      },
      timeComplexity: 'Typically O(N log N) dominated by sorting, followed by O(N) linear scan.',
      spaceComplexity: 'O(1) auxiliary space (or O(N) for sort buffer).',
      commonMistakes: [
        'Applying greedy when local optimal decisions eliminate the true global optimal (e.g. 0/1 knapsack).',
        'Sorting by start time instead of end time in interval scheduling.',
      ],
      interviewQuestions: [
        {
          question: 'Why does the Fractional Knapsack problem work with Greedy, but 0/1 Knapsack fails?',
          answer: 'In Fractional Knapsack, you can take fractional portions of items, so filling by highest value-to-weight ratio is always optimal. In 0/1 Knapsack, taking an item with high density might prevent fitting another item that leaves less empty space, requiring Dynamic Programming.',
          companies: ['Amazon', 'Microsoft'],
          difficulty: 'BEGINNER',
        },
      ],
      practiceExercises: [
        {
          title: 'Jump Game',
          slug: 'jump-game',
          description: 'Determine if you are able to reach the last index starting at index 0.',
          difficulty: 'INTERMEDIATE',
          hint: 'Keep track of the maximum reachable index as you iterate through the array.',
        },
      ],
      revisionNotes: `• Greedy makes locally optimal choices at each step without backtracking.
• Interval scheduling: always sort by earliest finishing (end) time.
• When greedy fails, transition to Dynamic Programming.`,
      quizQuestions: [
        {
          id: 'gr-1',
          question: 'In the interval scheduling maximization problem, which sorting criterion guarantees the optimal greedy choice?',
          options: [
            'Shortest duration first',
            'Earliest start time first',
            'Earliest end (finish) time first',
            'Latest start time first',
          ],
          correctIndex: 2,
          explanation: 'Sorting by earliest end time leaves the maximum possible remaining time for subsequent non-overlapping intervals.',
        },
      ],
    },
  },
  {
    slug: 'dynamic-programming',
    title: 'Dynamic Programming',
    shortDescription: 'Overlapping subproblems, optimal substructure, memoization (top-down), tabulation (bottom-up), and state space optimization.',
    order: 12,
    level: 'ADVANCED',
    icon: 'TableProperties',
    prerequisites: ['Recursion and Backtracking'],
    lesson: {
      slug: 'dynamic-programming-mastery',
      title: 'Dynamic Programming: Memoization, Tabulation, and State Optimization',
      description: 'Master optimal substructure, overlapping subproblems, 1D and 2D DP tables, space compression, 0/1 Knapsack, and Longest Common Subsequence.',
      estimatedMinutes: 35,
      explanation: `Dynamic Programming (DP) is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems, solving each subproblem once, and storing its solution in memory.

Two Core Requirements:
1. Optimal Substructure: The optimal solution to the problem can be constructed from optimal solutions to its subproblems.
2. Overlapping Subproblems: The same subproblems are solved repeatedly in a naive recursive evaluation (unlike divide-and-conquer where subproblems are disjoint).

Two Implementation Paradigms:
1. Top-Down with Memoization: Write natural recursion and cache results in a hash map or array (\`memo[state]\`).
2. Bottom-Up with Tabulation: Iteratively fill a table from base cases up to the desired target, eliminating recursion call stack overhead.
3. Space Optimization: If \`dp[i]\` only depends on \`dp[i-1]\` and \`dp[i-2]\`, compress the O(N) array down to O(1) variables!`,
      analogy: `Imagine your teacher writes on the chalkboard: \`1 + 1 + 1 + 1 + 1\`.
She asks: "What does that equal?"
You count and answer: "5!"
She then writes another \`+ 1\` at the end: \`1 + 1 + 1 + 1 + 1 + 1\`.
She asks: "What does that equal now?"
You instantly reply: "6!"
"How did you know so fast without re-counting from the beginning?"
"Because I remembered it was 5 before, and 5 + 1 = 6!" That is Dynamic Programming.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: 0/1 Knapsack
Weights: \`[1, 2, 3]\`, Values: \`[6, 10, 12]\`. Max Capacity: \`W = 5\`
Recurrence: \`dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])\`

| Item (wt, val) | w=0 | w=1 | w=2 | w=3 | w=4 | w=5 | Explanation |
|:---|:---|:---|:---|:---|:---|:---|:---|
| None (i=0) | 0 | 0 | 0 | 0 | 0 | 0 | Base cases with 0 items |
| Item 1 (1, 6) | 0 | 6 | 6 | 6 | 6 | 6 | Item 1 fits in any cap >= 1 |
| Item 2 (2, 10) | 0 | 6 | 10 | 16 (10+6) | 16 | 16 | Can take both item 1 and 2 at w>=3 |
| Item 3 (3, 12) | 0 | 6 | 10 | 16 | 18 (12+6) | 22 (12+10) | At w=5, best is items 2 & 3: val = 22 |

Optimal maximum value = 22.`,
      codeSnippets: {
        cpp: `// C++: Longest Common Subsequence (2D Tabulation & Space Optimization)
#include <string>
#include <vector>
#include <algorithm>

int longestCommonSubsequence(const std::string& text1, const std::string& text2) {
    int m = text1.size(), n = text2.size();
    std::vector<int> prev(n + 1, 0), curr(n + 1, 0);

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (text1[i - 1] == text2[j - 1]) {
                curr[j] = 1 + prev[j - 1];
            } else {
                curr[j] = std::max(prev[j], curr[j - 1]);
            }
        }
        prev = curr;
    }
    return prev[n];
}`,
        java: `// Java: Coin Change (Unbounded Knapsack)
import java.util.Arrays;

public class CoinChange {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        python: `# Python: House Robber with O(1) Space Optimization
def rob(nums: list[int]) -> int:
    rob1, rob2 = 0, 0
    # [rob1, rob2, n, n+1, ...]
    for n in nums:
        temp = max(n + rob1, rob2)
        rob1 = rob2
        rob2 = temp
    return rob2`,
        javascript: `// JavaScript: Climbing Stairs (Fibonacci DP)
function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1, second = 2;
  for (let i = 3; i <= n; i++) {
    const third = first + second;
    first = second;
    second = third;
  }
  return second;
}`,
      },
      timeComplexity: '0/1 Knapsack: O(N * W). LCS: O(M * N). Coin Change: O(Amount * CoinsCount).',
      spaceComplexity: 'Standard 2D table: O(M * N); Space-optimized row buffer: O(min(M, N)).',
      commonMistakes: [
        'Incorrect base case initialization (e.g. initializing min DP with 0 instead of infinity).',
        'Direction of iteration in 1D array 0/1 knapsack: must loop backwards from W down to wt[i] to prevent reusing the same item multiple times.',
      ],
      interviewQuestions: [
        {
          question: 'How do you determine whether a problem can be solved with Dynamic Programming?',
          answer: 'Look for: (1) Optimization requests (min/max/number of ways), (2) Decisions at each step affecting future choices, and (3) A recursive tree revealing identical subproblems evaluated multiple times.',
          companies: ['Google', 'Meta', 'Amazon', 'Apple', 'ByteDance'],
          difficulty: 'ADVANCED',
        },
      ],
      practiceExercises: [
        {
          title: 'Coin Change',
          slug: 'coin-change',
          description: 'Return the fewest number of coins that you need to make up that amount.',
          difficulty: 'INTERMEDIATE',
          hint: 'dp[amount] = min(dp[amount], 1 + dp[amount - coin]).',
        },
      ],
      revisionNotes: `• Top-down = Recursion + Memoization. Bottom-up = Iterative Tabulation.
• In 0/1 Knapsack 1D array optimization, iterate capacity backwards to avoid item reuse.
• In Unbounded Knapsack, iterate capacity forwards.`,
      quizQuestions: [
        {
          id: 'dp-1',
          question: 'Why must we iterate the capacity BACKWARDS when optimizing 0/1 Knapsack to a 1D array?',
          options: [
            'To sort the array in reverse',
            'To ensure that each item is used at most once by referencing values from the previous item tier',
            'To avoid negative numbers',
            'Because memory caches read right-to-left',
          ],
          correctIndex: 1,
          explanation: 'Iterating backwards ensures that dp[w - weight] reflects the state from the previous item (before current item consideration), preventing the current item from being added multiple times.',
        },
      ],
    },
  },
  {
    slug: 'tries-and-union-find',
    title: 'Tries and Union Find',
    shortDescription: 'Prefix trees for string retrieval and Disjoint Set Union (DSU) with rank and path compression for dynamic connectivity.',
    order: 13,
    level: 'ADVANCED',
    icon: 'Binary',
    prerequisites: ['Trees and Binary Search Trees', 'Graphs'],
    lesson: {
      slug: 'tries-and-union-find-mastery',
      title: 'Tries and Disjoint Set Union: Prefix Matching and Near-O(1) Equivalence',
      description: 'Master Prefix Tree (Trie) nodes, autocomplete prefix searches, Disjoint Set Union (DSU), path compression, and union by rank.',
      estimatedMinutes: 25,
      explanation: `1. Trie (Prefix Tree):
A tree data structure used for storing strings where each node represents a common prefix character.
- Lookup / Insertion: O(L) where L is string length, completely independent of the number of strings N in the dictionary!
- Used in: Autocomplete, spell check, IP routing tables (longest prefix match).

2. Union-Find (Disjoint Set Union - DSU):
A data structure that tracks a partition of a set into disjoint (non-overlapping) subsets.
Operations:
- \`find(i)\`: Determine which subset element \`i\` belongs to (finds representative root).
- \`union(i, j)\`: Merge the subset containing \`i\` with the subset containing \`j\`.

Two Crucial Optimizations for DSU:
1. Path Compression: During \`find(i)\`, update \`parent[i] = find(parent[i])\` to point nodes directly to the root, flattening the tree.
2. Union by Rank/Size: Attach smaller trees under the root of larger trees to keep tree depth minimal.
Result: Amortized operations run in O(α(N)) time, where α is the Inverse Ackermann function. For all practical universe sizes (N < 10^80), α(N) < 5 — effectively constant O(1)!`,
      analogy: `Trie: A predictive smartphone keyboard. As you type "c-a-r", the phone traverses the 'c', then 'a', then 'r' node, immediately revealing candidate branches: "cart", "card", "carpet".
Union-Find: Social circles merging at a festival. When Alice (group leader X) and Bob (group leader Y) shake hands, group Y merges into group X. Anyone in either group can instantly check if they share the same leader.`,
      dryRunMarkdown: `### Step-by-Step Dry Run: Union-Find with Path Compression
Nodes: 0, 1, 2, 3. Initially parent of each node is itself: \`parent = [0, 1, 2, 3]\`

| Operation | Arguments | Roots Found | Action | Parent Array |
|:---|:---|:---|:---|:---|
| \`union(0, 1)\` | 0, 1 | \`find(0)=0\`, \`find(1)=1\` | Set \`parent[1] = 0\` | \`[0, 0, 2, 3]\` |
| \`union(2, 3)\` | 2, 3 | \`find(2)=2\`, \`find(3)=3\` | Set \`parent[3] = 2\` | \`[0, 0, 2, 2]\` |
| \`union(1, 3)\` | 1, 3 | \`find(1)=0\`, \`find(3)=2\` | Merge roots: \`parent[2] = 0\` | \`[0, 0, 0, 2]\` |
| \`find(3)\` | 3 | Traverses 3 -> 2 -> 0 | Path compression: \`parent[3] = 0\` | \`[0, 0, 0, 0]\` |

All nodes now point directly to leader 0 in a flat tree!`,
      codeSnippets: {
        cpp: `// C++: Disjoint Set Union (DSU) with Path Compression & Rank
#include <vector>
#include <numeric>

class UnionFind {
private:
    std::vector<int> parent, rank;
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        std::iota(parent.begin(), parent.end(), 0);
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    bool unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false;
        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
        else { parent[rootJ] = rootI; rank[rootI]++; }
        return true;
    }
};`,
        java: `// Java: Trie (Prefix Tree) Implementation
public class Trie {
    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEndOfWord = false;
    }

    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new TrieNode();
            }
            node = node.children[idx];
        }
        node.isEndOfWord = true;
    }

    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return true;
    }
}`,
        python: `# Python: Complete Trie with Insert, Search, StartsWith
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`,
        javascript: `// JavaScript: Union-Find with Path Compression
class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return this.parent[i] = this.find(this.parent[i]);
  }
  union(i, j) {
    const rootI = this.find(i), rootJ = this.find(j);
    if (rootI === rootJ) return false;
    if (this.rank[rootI] < this.rank[rootJ]) this.parent[rootI] = rootJ;
    else if (this.rank[rootI] > this.rank[rootJ]) this.parent[rootJ] = rootI;
    else { this.parent[rootJ] = rootI; this.rank[rootI]++; }
    return true;
  }
}`,
      },
      timeComplexity: 'Trie Insert/Search: O(L) where L is string length. DSU Find/Union: Amortized O(α(N)) ≈ O(1).',
      spaceComplexity: 'Trie: O(AlphabetSize * L * N). DSU: O(N) array storage.',
      commonMistakes: [
        'Forgetting the \`isEndOfWord\` boolean in Trie nodes, causing prefix matches to report full word existence incorrectly.',
        'Omitting path compression in Union-Find, allowing tree height to degrade to O(N).',
      ],
      interviewQuestions: [
        {
          question: 'What is the Inverse Ackermann function α(N) and why does DSU achieve near-O(1) time?',
          answer: 'The Ackermann function grows extraordinarily fast; its inverse α(N) grows so slowly that for any input size N achievable in the physical universe (N ≤ 10^80 atoms), α(N) is strictly less than 5. Combining Path Compression with Union by Rank guarantees amortized O(α(N)) runtime per operation.',
          companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
          difficulty: 'ADVANCED',
        },
      ],
      practiceExercises: [
        {
          title: 'Implement Trie (Prefix Tree)',
          slug: 'implement-trie',
          description: 'Implement a trie with insert, search, and startsWith methods.',
          difficulty: 'INTERMEDIATE',
          hint: 'Each node has an array or map of children and a boolean flag indicating if it is the end of a word.',
        },
      ],
      revisionNotes: `• Trie lookup takes O(L) where L is string length, independent of dictionary size.
• DSU with Path Compression and Union by Rank runs in near-constant O(α(N)) time.
• Ideal for Kruskal’s minimum spanning tree and connected component detection.`,
      quizQuestions: [
        {
          id: 'tf-1',
          question: 'What does Path Compression accomplish in the Find operation of Disjoint Set Union?',
          options: [
            'It sorts the elements alphabetically',
            'It connects every visited node directly to the root representative, flattening the tree depth for future operations',
            'It calculates graph shortest paths',
            'It reallocates memory to a hash map',
          ],
          correctIndex: 1,
          explanation: 'Path compression flattens the tree so that every node visited during find() points directly to the root, making future find() operations near-instant O(1).',
        },
      ],
    },
  },
];

// Rich Practice Problems Across Difficulties & Topics
export const DSA_PRACTICE_PROBLEMS: DSAPracticeProblem[] = [
  {
    id: 'b1010001-0001-0001-0001-000000000001',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'EASY',
    topicSlug: 'hashing',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    hints: [
      'A brute force approach would search all pairs in O(N^2) time. Can we do better using a hash table?',
      'As you iterate through the array, can you check if (target - current_number) has already been seen in O(1) time?',
    ],
    starterCode: {
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass
`,
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  return [];
}
`,
      cpp: `#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    // Write your solution here
    return {};
}
`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}
`,
    },
    testCases: [
      { input: '{"nums": [2, 7, 11, 15], "target": 9}', expectedOutput: '[0, 1]', isHidden: false },
      { input: '{"nums": [3, 2, 4], "target": 6}', expectedOutput: '[1, 2]', isHidden: false },
      { input: '{"nums": [3, 3], "target": 6}', expectedOutput: '[0, 1]', isHidden: false },
      { input: '{"nums": [1, 5, 8, 12, 19], "target": 20}', expectedOutput: '[0, 4]', isHidden: true },
    ],
    order: 1,
    isPublished: true,
    createdAt: '2026-11-20T10:00:00Z',
    updatedAt: '2026-11-20T10:00:00Z',
  },
  {
    id: 'b1010001-0001-0001-0001-000000000002',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'EASY',
    topicSlug: 'stacks-and-queues',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: "()[]{}"',
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    hints: [
      'Use a stack to keep track of expected closing brackets.',
      'When you see an opening bracket, push its matching closing bracket onto the stack.',
      'When you see a closing bracket, check if the stack is non-empty and the top matches.',
    ],
    starterCode: {
      python: `def is_valid(s: str) -> bool:
    # Write your solution here
    return False
`,
      javascript: `function isValid(s) {
  // Write your solution here
  return false;
}
`,
      cpp: `#include <string>
#include <stack>

bool isValid(std::string s) {
    // Write your solution here
    return false;
}
`,
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}
`,
    },
    testCases: [
      { input: '{"s": "()"}', expectedOutput: 'true', isHidden: false },
      { input: '{"s": "()[]{}"}', expectedOutput: 'true', isHidden: false },
      { input: '{"s": "(]"}', expectedOutput: 'false', isHidden: false },
      { input: '{"s": "([{}])"}', expectedOutput: 'true', isHidden: true },
      { input: '{"s": "["}', expectedOutput: 'false', isHidden: true },
    ],
    order: 2,
    isPublished: true,
    createdAt: '2026-11-20T10:00:00Z',
    updatedAt: '2026-11-20T10:00:00Z',
  },
  {
    id: 'b1010001-0001-0001-0001-000000000003',
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'EASY',
    topicSlug: 'binary-search',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.',
    ],
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' },
    ],
    hints: [
      'Maintain two pointers: low and high.',
      'Calculate mid = low + (high - low) // 2.',
      'If nums[mid] == target, return mid.',
    ],
    starterCode: {
      python: `def search(nums: list[int], target: int) -> int:
    # Write your solution here
    return -1
`,
      javascript: `function search(nums, target) {
  // Write your solution here
  return -1;
}
`,
      cpp: `#include <vector>

int search(std::vector<int>& nums, int target) {
    // Write your solution here
    return -1;
}
`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
}
`,
    },
    testCases: [
      { input: '{"nums": [-1, 0, 3, 5, 9, 12], "target": 9}', expectedOutput: '4', isHidden: false },
      { input: '{"nums": [-1, 0, 3, 5, 9, 12], "target": 2}', expectedOutput: '-1', isHidden: false },
      { input: '{"nums": [5], "target": 5}', expectedOutput: '0', isHidden: true },
      { input: '{"nums": [2, 4, 6, 8, 10, 12, 14], "target": 14}', expectedOutput: '6', isHidden: true },
    ],
    order: 3,
    isPublished: true,
    createdAt: '2026-11-20T10:00:00Z',
    updatedAt: '2026-11-20T10:00:00Z',
  },
  {
    id: 'b1010001-0001-0001-0001-000000000004',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'MEDIUM',
    topicSlug: 'two-pointers-and-sliding-window',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' },
    ],
    hints: [
      'Use a sliding window with left and right pointers.',
      'Use a hash map or set to record the characters present in the current window.',
      'If a duplicate is encountered, advance the left pointer until the duplicate is evicted.',
    ],
    starterCode: {
      python: `def length_of_longest_substring(s: str) -> int:
    # Write your solution here
    return 0
`,
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  return 0;
}
`,
      cpp: `#include <string>
#include <unordered_set>
#include <algorithm>

int lengthOfLongestSubstring(std::string s) {
    // Write your solution here
    return 0;
}
`,
      java: `import java.util.HashSet;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }
}
`,
    },
    testCases: [
      { input: '{"s": "abcabcbb"}', expectedOutput: '3', isHidden: false },
      { input: '{"s": "bbbbb"}', expectedOutput: '1', isHidden: false },
      { input: '{"s": "pwwkew"}', expectedOutput: '3', isHidden: false },
      { input: '{"s": ""}', expectedOutput: '0', isHidden: true },
      { input: '{"s": "au"}', expectedOutput: '2', isHidden: true },
    ],
    order: 4,
    isPublished: true,
    createdAt: '2026-11-20T10:00:00Z',
    updatedAt: '2026-11-20T10:00:00Z',
  },
  {
    id: 'b1010001-0001-0001-0001-000000000005',
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'MEDIUM',
    topicSlug: 'dynamic-programming',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4',
    ],
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    hints: [
      'Let dp[i] be the minimum coins needed to make amount i.',
      'Initialize dp array with infinity, dp[0] = 0.',
      'For each amount from 1 to total, dp[i] = min(dp[i], 1 + dp[i - coin]) for each coin.',
    ],
    starterCode: {
      python: `def coin_change(coins: list[int], amount: int) -> int:
    # Write your solution here
    return -1
`,
      javascript: `function coinChange(coins, amount) {
  // Write your solution here
  return -1;
}
`,
      cpp: `#include <vector>
#include <algorithm>

int coinChange(std::vector<int>& coins, int amount) {
    // Write your solution here
    return -1;
}
`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        // Write your solution here
        return -1;
    }
}
`,
    },
    testCases: [
      { input: '{"coins": [1, 2, 5], "amount": 11}', expectedOutput: '3', isHidden: false },
      { input: '{"coins": [2], "amount": 3}', expectedOutput: '-1', isHidden: false },
      { input: '{"coins": [1], "amount": 0}', expectedOutput: '0', isHidden: false },
      { input: '{"coins": [186, 419, 83, 408], "amount": 6249}', expectedOutput: '20', isHidden: true },
    ],
    order: 5,
    isPublished: true,
    createdAt: '2026-11-20T10:00:00Z',
    updatedAt: '2026-11-20T10:00:00Z',
  },
  {
    id: 'b1010001-0001-0001-0001-000000000006',
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'MEDIUM',
    topicSlug: 'graphs',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a, b]\` indicates that you **must** take course \`b\` first if you want to take course \`a\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= a, b < numCourses',
      'All the pairs prerequisites[i] are unique.',
    ],
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'To take course 1 you should have finished course 0. So it is possible.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.' },
    ],
    hints: [
      'This problem is equivalent to detecting a directed cycle in a graph.',
      'Use Kahn’s algorithm (in-degrees and queue) or DFS with 3-color cycle detection.',
    ],
    starterCode: {
      python: `def can_finish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    # Write your solution here
    return True
`,
      javascript: `function canFinish(numCourses, prerequisites) {
  // Write your solution here
  return true;
}
`,
      cpp: `#include <vector>
#include <queue>

bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
    // Write your solution here
    return true;
}
`,
      java: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your solution here
        return true;
    }
}
`,
    },
    testCases: [
      { input: '{"numCourses": 2, "prerequisites": [[1, 0]]}', expectedOutput: 'true', isHidden: false },
      { input: '{"numCourses": 2, "prerequisites": [[1, 0], [0, 1]]}', expectedOutput: 'false', isHidden: false },
      { input: '{"numCourses": 3, "prerequisites": [[1, 0], [2, 1]]}', expectedOutput: 'true', isHidden: true },
    ],
    order: 6,
    isPublished: true,
    createdAt: '2026-11-20T10:00:00Z',
    updatedAt: '2026-11-20T10:00:00Z',
  },
  {
    id: 'b1010001-0001-0001-0001-000000000007',
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'HARD',
    topicSlug: 'arrays-and-strings',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5',
    ],
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.',
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9',
      },
    ],
    hints: [
      'Water trapped at index i is determined by: min(maxLeft[i], maxRight[i]) - height[i].',
      'Can you optimize the space from O(N) auxiliary arrays to O(1) using two pointers converging inwards?',
    ],
    starterCode: {
      python: `def trap(height: list[int]) -> int:
    # Write your solution here
    return 0
`,
      javascript: `function trap(height) {
  // Write your solution here
  return 0;
}
`,
      cpp: `#include <vector>
#include <algorithm>

int trap(std::vector<int>& height) {
    // Write your solution here
    return 0;
}
`,
      java: `class Solution {
    public int trap(int[] height) {
        // Write your solution here
        return 0;
    }
}
`,
    },
    testCases: [
      { input: '{"height": [0,1,0,2,1,0,1,3,2,1,2,1]}', expectedOutput: '6', isHidden: false },
      { input: '{"height": [4,2,0,3,2,5]}', expectedOutput: '9', isHidden: false },
      { input: '{"height": [3, 0, 2, 0, 4]}', expectedOutput: '7', isHidden: true },
    ],
    order: 7,
    isPublished: true,
    createdAt: '2026-11-20T10:00:00Z',
    updatedAt: '2026-11-20T10:00:00Z',
  },
];
