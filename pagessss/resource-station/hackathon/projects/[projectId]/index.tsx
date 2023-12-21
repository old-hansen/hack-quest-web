import FeatureProjects from '@/components/v2/ResourceStation/FeaturedProject';
import ProjectDetail from '@/components/v2/ResourceStation/ProjectDetail';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface ProjectDetailPageProps {}

const ProjectDetailPage: FC<ProjectDetailPageProps> = (props) => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <div className="container mx-auto">
        {projectId && (
          <ProjectDetail projectId={projectId as string}></ProjectDetail>
        )}
      </div>
      <div className="mt-[80px]">
        <FeatureProjects
          ignoreProjectId={projectId as string}
        ></FeatureProjects>
      </div>
    </div>
  );
};

export default ProjectDetailPage;