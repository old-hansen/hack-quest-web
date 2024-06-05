import * as React from 'react';
import { Idea } from '@/service/webApi/ideas/types';
import { PageResult } from '@/service/webApi/type';
import { IdeaCard } from './idea-card';
import { FilterPanel } from '../filters';
import { Pagination } from './pagination';
import { Empty } from './empty';
import { LIMIT_PER_PAGE } from './constants';

export function AllIdeas({ ideas }: { ideas: PageResult<Idea> }) {
  return (
    <div className="px-5 sm:px-0">
      <h1 className="sm:headline-h3 headline-h2-mob">All Ideas</h1>
      <FilterPanel />
      {ideas.total === 0 && <Empty />}
      <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 pb-10 sm:grid-cols-4 sm:pb-20 sm:pt-8">
        {ideas.data?.map((idea) => <IdeaCard key={idea.id} {...idea} />)}
      </div>
      {ideas.total > LIMIT_PER_PAGE && <Pagination total={ideas.total} />}
    </div>
  );
}
