import { ReactNode, useEffect, useState } from 'react';
import { reservedWords } from '@/constants/solidity';
import { LineType, CodeLineType } from '@/components/v2/LessonPage/type';

export interface AnswerState {
  id: string;
  value: string;
  inputValue: string;
  answer: string;
  regex: string;
  error?: boolean;
  answers?: AnswerState[];
}
export interface WaitingRenderCodeType {
  type: string;
  render: (answerState: AnswerState[]) => ReactNode;
}

const AnswerInputTextarea = (props: {
  error: boolean | undefined;
  uuid: string;
  type?: LineType;
  onChange: (id: string, v: string) => void;
}) => {
  const borderBackBg = !!props.error
    ? {
        backgroundColor: '#FFF7F5',
        border: '1px solid #C73333'
      }
    : {
        backgroundColor: 'var(--lesson-code-input-bg)',
        border: '1px solid var(--lesson-code-input-border)'
      };
  return (
    <textarea
      placeholder="Type your answer here"
      type="text"
      style={{
        color: '#333',
        outline: 'none',
        borderRadius: '3px',
        width: props.type === LineType.INSERT_INPUT ? '100px' : '100%',
        height: '40px',
        padding: '8px',
        resize: 'none' /* 禁止用户手动调整大小 */,
        overflow: 'hidden' /* 隐藏溢出的内容 */,
        ...borderBackBg
      }}
      data-uuid={props.uuid}
      onInput={(e) => {
        if (props.type === LineType.INSERT_INPUT) return;
        const textarea = e.target as HTMLTextAreaElement;
        textarea.style.backgroundColor = 'var(--lesson-code-input-bg)';
        // 重置textarea的高度为默认值，以便可以正确计算其内容的高度
        textarea.style.height = '40px';
        // 获取textarea的内容高度，并加上padding和border的高度
        let height = textarea.scrollHeight;
        let lineLen = textarea.value.split('\n').length;
        // 将textarea的高度设置为内容高度
        textarea.style.height = height + 'px';
      }}
      onChange={(e) => {
        const currentId = e.target.dataset.uuid;
        const value = e.target.value;
        props.onChange(currentId!, value);
      }}
    ></textarea>
  );
};

const AnswerInput = (props: {
  error: boolean | undefined;
  uuid: string;
  type?: LineType;
  onChange: (id: string, v: string) => void;
}) => {
  const borderBackBg = !!props.error
    ? {
        backgroundColor: '#FFF7F5',
        border: '1px solid #C73333'
      }
    : {
        backgroundColor: 'var(--lesson-code-input-bg)',
        border: '1px solid var(--lesson-code-input-border)'
      };
  return (
    <input
      placeholder="Type answer"
      type="text"
      style={{
        color: '#333',
        outline: 'none',
        borderRadius: '3px',
        width: '110px',
        height: '40px',
        padding: '8px',
        ...borderBackBg
      }}
      data-uuid={props.uuid}
      onChange={(e) => {
        const currentId = e.target.dataset.uuid;
        const value = e.target.value;
        props.onChange(currentId!, value);
      }}
    />
  );
};

const codeRender = (codes: any) => {
  return codes.map((code: string, index: number) => {
    if (reservedWords.includes(code) && code.trim()) {
      return (
        <span key={index} style={{ color: `var(--solidity-${code})` }}>
          {code + '\u00A0\u00A0'}
        </span>
      );
    }
    return code + '\u00A0\u00A0';
  });
};

export const useParseQuizA = (lines: CodeLineType[]) => {
  /** 等待渲染到界面的code */
  const [waitingRenderCodes, setWaitingRenderCodes] = useState<
    WaitingRenderCodeType[]
  >([]);

  /** 答案的实时状态 */
  const [answerState, setAnswerState] = useState<AnswerState[]>([]);

  /** 错误行 */
  const [errorLine, setErrorLine] = useState<AnswerState[]>([]);

  const mergeAnswer = (answer: AnswerState) => {
    setAnswerState((state) => {
      const answers = state.concat(answer);
      return [...new Set(answers.map((v) => JSON.stringify(v)))].map((v) =>
        JSON.parse(v)
      );
    });
  };

  /** 处理输入框在一行文本中间插入的情况 */
  const parseLineByCenterInsert = (line: CodeLineType) => {
    const answer: AnswerState = {
      id: line.id,
      answer: line.content,
      value: '',
      inputValue: '',
      regex: line.regex
    };
    //将字符串 如'mapping(@@uint => string##) temp;' 里面的 @@@uint => string## 拿出来
    //并将剩下的字符串拆成数组 ['mapping(', ') temp;']
    const regex = /(@@)(((.|\n)*?))((##))/g;
    const replaceStr = `[${+new Date()}]`;
    const { content = '', answers } = line;
    answers.map((v) => (v.type = LineType.INSERT_INPUT));
    const code = (content as any).trim().match(regex)[0];
    const index = content.indexOf(code) ? 1 : 0;
    const rendArr = content
      .replace(regex, replaceStr)
      .split(replaceStr)
      .map((v) => {
        return {
          type: LineType.DEFAULT,
          content: v.split(' ')
        };
      });
    const answersArr: AnswerState[] = [];
    //这里将answers交叉插入到rendArr里面 间隔为1
    //如果index为0 则从rendArr第0个位置之前开始交叉插入
    //如果index为1 则从rendArr第0个位置之后开始交叉插入
    if (index) {
      answers.forEach(function (item, i) {
        rendArr.splice(1 * (i + 1) + i, 0, item);
      });
    } else {
      rendArr.unshift({} as any);
      answers.forEach(function (item, i) {
        rendArr.splice(1 * (i + 1) + i, 0, item);
      });
      rendArr.shift();
    }
    rendArr.map((v: any, i) => {
      v.type === LineType.INSERT_INPUT &&
        answersArr.push({
          id: `${line.id}${i}`,
          answer: v.content,
          value: '',
          inputValue: '',
          regex: v.regex
        });
    });
    answer.answers = answersArr;
    mergeAnswer(answer);
    const inputLine = {
      type: 'input_insert',
      render(newAnswerState: AnswerState[]) {
        return rendArr.map((v, i: number) => {
          if (v.type === LineType.DEFAULT) {
            return <span key={i}>{codeRender(v.content)}</span>;
          } else {
            const inputId = `${line.id}${i}`;
            const currentLineState = newAnswerState
              .find((v) => v.id === line.id)
              ?.answers?.find((v) => v.id === inputId);
            return (
              <AnswerInput
                key={inputId}
                uuid={inputId}
                type={v.type}
                error={currentLineState?.error}
                onChange={(id, value) => {
                  if (!currentLineState) return;
                  setAnswerState((state) => {
                    const otherAnswerState = state.filter(
                      (item) => item.id !== line.id
                    );
                    const curAnswerState = state.find(
                      (item) => item.id === line.id
                    ) as AnswerState;
                    const curAnswers = (
                      curAnswerState?.answers as AnswerState[]
                    )
                      .filter((item) => item.id !== inputId)
                      .concat({
                        ...currentLineState,
                        value,
                        error: false,
                        inputValue: value
                      });
                    curAnswerState.answers = curAnswers;
                    return [
                      ...otherAnswerState,
                      curAnswerState
                    ] as AnswerState[];
                  });
                }}
              ></AnswerInput>
            );
          }
        });
      }
    };
    return inputLine;
  };

  const parseLineBySingleLine = (line: CodeLineType) => {
    const answer = {
      id: line.id,
      answer: line.content,
      value: '',
      inputValue: '',
      regex: line.regex
    };
    mergeAnswer(answer);
    const inputLine = {
      type: 'input',
      render(newAnswerState: AnswerState[]) {
        const currentLineState = newAnswerState.find(
          (item) => item.id === line.id
        );
        return (
          <AnswerInputTextarea
            uuid={line.id}
            error={currentLineState?.error}
            onChange={(id, value) => {
              if (!currentLineState) return;
              setAnswerState((state) => {
                return state
                  .filter((item) => item.id !== id)
                  .concat({
                    ...currentLineState,
                    value,
                    error: false,
                    inputValue: value
                  });
              });
            }}
          ></AnswerInputTextarea>
        );
      }
    };
    return inputLine;
  };

  const parseLineByTextLine = (line: CodeLineType) => {
    if (line.type === LineType.ANNOTATION) {
      // 处理注释行
      const spanLine = {
        type: 'span',
        render() {
          return (
            <span style={{ color: 'rgb(96,139,78)' }}>
              {line.content.replaceAll(/ /g, '\u00A0\u00A0')}
            </span>
          );
        }
      };
      return spanLine;
    }

    const codes = line.content.split(' ');
    const spanLine = {
      type: 'span',
      render() {
        return <span>{codeRender(codes)}</span>;
      }
    };

    return spanLine;
  };
  const parseTypeRender = (waitLine: CodeLineType) => {
    switch (waitLine.type) {
      case LineType.ANNOTATION: //注释
      case LineType.DEFAULT: // 普通文本
        return parseLineByTextLine(waitLine);
      case LineType.INPUT: //整行输入框
        return parseLineBySingleLine(waitLine);
      case LineType.INSERT_INPUT: //行内输入框
        return parseLineByCenterInsert(waitLine);
    }
  };
  const parseWaitingRenderCodes = (waitLines: CodeLineType[]) => {
    const waitCodeRenderLines: {
      type: string;
      render: (newAnswerState: AnswerState[]) => ReactNode;
    }[] = [];
    for (let i = 0; i < waitLines.length; i++) {
      let waitLine = waitLines[i];
      const formatLine = parseTypeRender(waitLine);
      waitCodeRenderLines.push(formatLine as WaitingRenderCodeType);
    }
    setWaitingRenderCodes(waitCodeRenderLines);
  };

  useEffect(() => {
    setAnswerState(() => []);
    parseWaitingRenderCodes(lines);
  }, [lines]);

  useEffect(() => {
    setErrorLine(() => {
      return answerState.filter((v) => {
        return !new RegExp(v.regex).test(v.value.trim());
      });
    });
  }, [answerState]);

  return {
    waitingRenderCodes,
    waitingRenderCodesDispatch: setWaitingRenderCodes,
    answerState,
    answerStateDispatch: setAnswerState,
    errorLine
  };
};
