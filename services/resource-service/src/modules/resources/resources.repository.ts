import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Resource } from '@system-atlas/contracts';
import { CURATED_RESOURCES } from './resources.data';

@Injectable()
export class ResourcesRepository {
  private inMemoryResources: Map<string, Resource> = new Map();

  constructor(private prisma?: PrismaService) {
    for (const res of CURATED_RESOURCES) {
      this.inMemoryResources.set(res.slug, res);
      this.inMemoryResources.set(res.id, res);
    }
  }

  async findAll(category?: string, search?: string, topic?: string): Promise<Resource[]> {
    let list = Array.from(new Set(this.inMemoryResources.values()));

    if (category && category !== 'ALL') {
      list = list.filter((r) => r.category === category);
    }

    if (topic) {
      const lowerTopic = topic.toLowerCase();
      list = list.filter((r) =>
        r.tags.some((t) => t.toLowerCase().includes(lowerTopic)) ||
        r.relatedTopics.some((rt) => rt.toLowerCase().includes(lowerTopic)),
      );
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.author && r.author.toLowerCase().includes(q)) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async findBySlug(slug: string): Promise<Resource> {
    const res = this.inMemoryResources.get(slug);
    if (!res) {
      throw new NotFoundException(`Resource with slug '${slug}' not found.`);
    }
    return res;
  }

  async create(resource: Resource): Promise<Resource> {
    this.inMemoryResources.set(resource.slug, resource);
    this.inMemoryResources.set(resource.id, resource);
    return resource;
  }

  async update(id: string, updates: Partial<Resource>): Promise<Resource> {
    let existing = Array.from(this.inMemoryResources.values()).find((r) => r.id === id);
    if (!existing) {
      throw new NotFoundException(`Resource with ID '${id}' not found.`);
    }
    const updated: Resource = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.inMemoryResources.set(updated.slug, updated);
    this.inMemoryResources.set(updated.id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const existing = Array.from(this.inMemoryResources.values()).find((r) => r.id === id);
    if (!existing) return false;
    this.inMemoryResources.delete(existing.slug);
    this.inMemoryResources.delete(existing.id);
    return true;
  }
}
