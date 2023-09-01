import { FC, ReactNode } from 'react';
import TextRenderer from '../TextRenderer';
import ComponentRenderer from '../../LessonPage/ComponentRenderer';

interface BulletedListItemRendererProps {
  component: any;
  parent: any;
}

const BulletedListItemRenderer: FC<BulletedListItemRendererProps> = (props) => {
  const { component, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;

  // const index = children
  //   ?.filter((child: any) => child.type === NotionRenderType.BULLETED_LIST_ITEM)
  //   .findIndex((child: any) => child.id === source.id);
  return (
    <div>
      <div className="flex items-center gap-2 py-1">
        <span className="">•</span>
        <TextRenderer richTextArr={component.content.rich_text}></TextRenderer>
      </div>
      <div className="ml-4">
        {component.children?.map((child: any, index: number) => {
          return (
            <ComponentRenderer
              key={index}
              component={child}
              parent={component}
            ></ComponentRenderer>
          );
        })}
      </div>
    </div>
  );
};

export default BulletedListItemRenderer;