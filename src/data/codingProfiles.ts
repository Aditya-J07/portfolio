export interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  category: string;
  accent: string;
  badge: string;
  description: string;
}

export const codingProfiles: CodingProfile[] = [
  {
    platform: 'LeetCode',
    handle: 'Aditya-J07',
    url: 'https://leetcode.com/u/Aditya-J07',
    category: 'DSA & Algorithms',
    accent: 'bg-[#FFA116] text-black',
    badge: 'LEETCODE',
    description: 'Active problem solver tackling algorithmic challenges across dynamic programming, trees, and graphs.',
  },
  {
    platform: 'Codeforces',
    handle: 'Aditya-J07',
    url: 'https://codeforces.com/profile/Aditya-J07',
    category: 'Competitive Programming',
    accent: 'bg-accent-red text-white',
    badge: 'CODEFORCES',
    description: 'Participating in rated rounds and solving algorithmic contest problems under time constraints.',
  },
  {
    platform: 'CodeChef',
    handle: 'adityaj07',
    url: 'https://www.codechef.com/users/adityaj07',
    category: 'Contests & Rating',
    accent: 'bg-accent-yellow text-accent-ink',
    badge: 'CODECHEF',
    description: 'Competing in monthly rated challenges and solving division practice problems.',
  },
  {
    platform: 'HackerRank',
    handle: 'adityajha_vats02',
    url: 'https://www.hackerrank.com/profile/adityajha_vats02',
    category: 'Badges & Domains',
    accent: 'bg-accent-green text-accent-ink',
    badge: 'HACKERRANK',
    description: 'Earned domain stars in Problem Solving, C++, and Python core competencies.',
  },
  {
    platform: 'GeeksforGeeks',
    handle: 'adityajha9at',
    url: 'https://www.geeksforgeeks.org/profile/adityajha9at',
    category: 'Practice & POTD',
    accent: 'bg-accent-green text-accent-ink',
    badge: 'GFG',
    description: 'Daily Problem of the Day solver, practicing fundamental data structures and interview questions.',
  },
  {
    platform: 'takeUforward',
    handle: '1si24ci001',
    url: 'https://takeuforward.org/profile/1si24ci001',
    category: 'A2Z DSA Roadmap',
    accent: 'bg-accent-purple text-accent-ink',
    badge: 'STRIVER A2Z',
    description: 'Tracking comprehensive progress across the Striver A2Z DSA sheet curriculum.',
  },
];

