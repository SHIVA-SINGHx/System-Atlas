import { ExternalLink, Bookmark } from 'lucide-react';

const mockResources = [
  {
    title: 'Google Spanner: Becoming a Globally Distributed Database',
    category: 'WHITE_PAPER',
    author: 'Google Research',
    url: 'https://research.google/pubs/pub39966/',
    description: 'Seminal paper detailing TrueTime API, multi-version concurrency control, and global Paxos consensus groups.',
  },
  {
    title: 'Designing Data-Intensive Applications',
    category: 'BOOK_REFERENCE',
    author: 'Martin Kleppmann',
    url: 'https://dataintensive.net/',
    description: 'The fundamental guide to reliability, scalability, and maintainability in data storage and processing systems.',
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">Curated Engineering Resources</h1>
        <p className="text-slate-400 mt-2">Verified white papers, architectural case studies, and engineering blogs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockResources.map((res, i) => (
          <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                {res.category}
              </span>
              <h2 className="text-lg font-bold text-white mt-3 mb-1">{res.title}</h2>
              <p className="text-xs text-slate-500 mb-3">By {res.author}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{res.description}</p>
            </div>
            <a
              href={res.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300 font-medium"
            >
              View Resource <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
