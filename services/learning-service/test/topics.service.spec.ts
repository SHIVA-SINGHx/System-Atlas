import { TopicsRepository } from '../src/modules/topics/topics.repository';

describe('TopicsRepository', () => {
  let repo: TopicsRepository;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      topic: {
        findMany: jest.fn().mockResolvedValue([{ id: 't1', slug: 'caching' }]),
      },
    };
    repo = new TopicsRepository(mockPrisma);
  });

  it('should fetch published topics', async () => {
    const result = await repo.findAllPublished();
    expect(result).toHaveLength(1);
    expect(mockPrisma.topic.findMany).toHaveBeenCalled();
  });
});
