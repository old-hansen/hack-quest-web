import CopyIcon from '@/components/Common/Icon/Copy';
import { ExampleContext } from '@/components/Web/Business/Renderer/ComponentRenderer/ExampleRenderer';
import { PlaygroundContext } from '@/components/Web/LessonPage/Playground/type';
import { Theme } from '@/constants/enum';
import { BurialPoint } from '@/helper/burialPoint';
import { ThemeContext } from '@/store/context/theme';
import { message } from 'antd';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeSourceType {
  content: {
    caption: any[];
    language: string;
    rich_text: { plain_text: string }[];
  };
  type: string;
}

interface CodeRendererProps {
  component: CodeSourceType;
  parent: any;
}

const CodeRenderer: FC<CodeRendererProps> = (props) => {
  const { component, parent } = props;
  const language = component.content.language;
  const { theme } = useContext(ThemeContext);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const [codeContent, setCodeContent] = useState('');
  const { updateExampleContent, isExample } = useContext(ExampleContext);
  const { isPlayground } = useContext(PlaygroundContext);
  useEffect(() => {
    if (component.content.rich_text) {
      const code = component.content.rich_text
        .map((richText: any) => richText.plain_text)
        .join('');
      setCodeContent(code);
      updateExampleContent(code);
    }
  }, [component.content.rich_text, updateExampleContent]);

  return (
    <div
      className={`relative rounded-md flex-1 overflow-hidden ${
        isPlayground ? 'flex flex-col' : ''
      }`}
      data-type={component.type}
    >
      <div className="h-[6px] relative bg-[#fafafa] rounded-t-[4.8px]">
        <div
          className="absolute top-[9px] right-[9px] text-[0.75rem] font-next-book text-[#E3E3E3] rounded-[0.5rem] cursor-pointer z-[10]"
          onClick={async (e) => {
            try {
              await navigator.clipboard.writeText(
                component.content.rich_text
                  .map((richText: any) => richText.plain_text)
                  .join('')
              );
              BurialPoint.track('lesson-code复制');
              message.success('Copy success!');
            } catch (e) {
              message.warning(
                'The browser version is too low or incompatible！'
              );
            }
          }}
        >
          <CopyIcon width={17} height={21} color={'currentColor'}></CopyIcon>
          {/* <span>Copy</span> */}
        </div>
      </div>
      {isPlayground ? (
        <div className="w-full flex-1 relative">
          <div className="absolute w-full h-full left-0 top-0 overflow-auto">
            <SyntaxHighlighter
              style={theme === Theme.Dark ? oneDark : oneLight}
              language={language}
              className="scroll-wrap-x scroll-wrap-y font-next-poster-Bold h-full rounded-t-[0!important] mt-[0!important]"
              showLineNumbers
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <SyntaxHighlighter
          style={theme === Theme.Dark ? oneDark : oneLight}
          language={language}
          className="scroll-wrap-x scroll-wrap-y font-next-poster-Bold h-[calc(100%-20px)] rounded-t-[0!important] mt-[0!important]"
          showLineNumbers
        >
          {codeContent}
        </SyntaxHighlighter>
      )}

      {/* <textarea className="hidden" ref={codeRef} value={}></textarea> */}
    </div>
  );
};

export default CodeRenderer;
