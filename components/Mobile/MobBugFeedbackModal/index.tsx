import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import { Checkbox, Form, FormInstance, Image, Input, UploadFile, UploadProps, message } from 'antd';
import { Upload } from 'antd';
import { IoMdAddCircle } from 'react-icons/io';
import { RcFile } from 'antd/es/upload';
import webApi from '@/service';
import { useRequest } from 'ahooks';

interface MobBugFeedbackModalProps {}

const validImageType = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];

export interface MobBugFeedbackModalRef {
  onCommit: (params: Record<string, any>) => void;
}

const kinds = [
  'Bug Report 反馈 Bug',
  'Improvement 改进意见',
  'UI advice UI建议',
  'New Feature 新功能建议',
  '其他意见 Other'
];

type A = (typeof kinds)[number];

const MobBugFeedbackModal = forwardRef<MobBugFeedbackModalRef, MobBugFeedbackModalProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [selectKinds, setSelectKinds] = useState<string[]>([]);
  const formRef = useRef<
    FormInstance<{
      kind: string[];
      description: string;
      files: { file: UploadFile; fileList: UploadFile[] };
    }>
  >(null);
  const [lessonId, setLessonId] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [loading, setLoading] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      onCommit(params) {
        setOpen(true);

        setLessonId(params.lessonId);
      }
    };
  });

  const beforeUpload = (file: RcFile) => {
    const isImage = validImageType.includes(file.type);
    if (!isImage) {
      let validFileTypeString = validImageType.map((item) => item.replace('image/', '')).join(',');
      message.error(`Unsupported image types. Currently supported image types are ${validFileTypeString}!`, 3);
      // return false;
    }

    const isValidSize = file.size <= 10000000;

    if (!isValidSize) {
      message.error(`File ${file.name} exceeds the 10MB size limit!`);
    }

    return (validImageType.includes(file.type) && isValidSize) || Upload.LIST_IGNORE;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,

    maxCount: 10,
    onChange(info) {
      setFileList(info.fileList);

      // console.log(info);
      // const { status } = info.file;
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files);
    }
  };

  const { run: submit, loading } = useRequest(
    async () => {
      const verifyRes = await formRef.current?.validateFields();
      if (!verifyRes) return;

      const { kind, files, description } = verifyRes;
      if (!kind?.length) throw new Error('Please select a bugs category!');

      let formData = new FormData();
      kind.forEach((k) => {
        formData.append('type[]', k);
      });
      formData.append('content', description);
      formData.append('lessonId', lessonId);
      formData.append('link', window.location.href);

      files?.fileList?.forEach((file) => {
        formData.append('file', file.originFileObj as RcFile);
      });

      const res = await webApi.courseApi.commitSuggest(formData);

      return res;
    },
    {
      onError(err: any) {
        if (err?.errorFields?.length) return;
        message.error(err.msg || err.message);
      },
      onSuccess(res) {
        formRef.current?.resetFields();
        setFileList([]);
        setSelectKinds([]);
        setOpen(false);
        message.success('Commit success!');
      },
      manual: true,
      debounceWait: 500
    }
  );

  const UploadButton = (
    <div className="flex h-full w-full items-center justify-center bg-transparent">
      <IoMdAddCircle size={24} color="#8c8c8c"></IoMdAddCircle>
    </div>
  );

  const FullUploadButton = (
    <div className="flex w-full items-center justify-center gap-[8px]">
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11.5" cy="11.5" r="11.5" fill="#8C8C8C" />
        <rect x="10" y="5.00391" width="3" height="13" rx="1.5" fill="white" />
        <rect x="18" y="10.0039" width="3" height="13" rx="1.5" transform="rotate(90 18 10.0039)" fill="white" />
      </svg>
      <span className="body-s text-neutral-medium-gray">Add attachments to your report (optional) </span>
    </div>
  );
  return (
    <Modal
      open={open}
      onClose={() => {
        formRef.current?.resetFields();
        setFileList([]);
        setSelectKinds([]);
        setOpen(false);
      }}
      showCloseIcon
      icon={
        <div className="absolute right-0 top-0 cursor-pointer">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="22.2734" y1="22.2745" x2="7.42416" y2="7.42521" stroke="#0B0B0B" />
            <line x1="7.42574" y1="22.2744" x2="22.275" y2="7.42513" stroke="#0B0B0B" />
          </svg>
        </div>
      }
      markBg="black"
    >
      <div className="max-h-[90vh] w-full  overflow-auto rounded-[10px] bg-neutral-off-white p-[1.25rem] pt-[1.875rem]">
        <h1 className="text-h3 text-neutral-black">Found a bug? Claim rewards!</h1>
        <p className="body-s mt-[10px] text-neutral-black">
          {`HackQuest is currently in beta, and your feedback is crucial. If you come across any bug or error while learning, report it to us. Once verified,  we'll reward you with XP and hack credits. Join us in delivering a better experience! 🐞🚀`}
        </p>
        <p className="body-l mt-[30px] text-neutral-black">What kind of bugs have you found1111?</p>
        <Form ref={formRef} name="control-hooks">
          <div className="relative mt-[10px] flex flex-wrap gap-[10px]">
            {kinds.map((kind, index) => {
              return (
                <Button
                  key={index}
                  className={cn(
                    `body-xs rounded-[10px] bg-[#DADADA] px-[14px] py-[3px] text-neutral-medium-gray`,
                    selectKinds.includes(kind) ? 'bg-yellow-primary text-neutral-black' : ''
                  )}
                  onClick={() => {
                    let kinds = [];
                    if (selectKinds.includes(kind)) {
                      kinds = selectKinds.filter((item) => item !== kind);
                    } else {
                      kinds = selectKinds.concat(kind);
                    }
                    setSelectKinds(kinds);
                    formRef.current?.setFieldValue('kind', kinds);
                  }}
                >
                  {kind}
                </Button>
              );
            })}
            <Form.Item
              // rules={[{ required: true, message: 'fwefweew' }]}
              name={'kind'}
              // className="absolute left-0 -top-2"
              className="hidden"
            >
              <Checkbox.Group options={kinds} value={selectKinds} />
            </Form.Item>
          </div>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'This field is required!'
              },
              {
                max: 1500,
                message: `This field can only contain a maximum of 1500 characters!`
              },
              {
                pattern: /\S+/,
                message: 'This field cannot be empty or contain only spaces!'
              }
            ]}
            name={'description'}
            className="mt-[20px]"
          >
            <Input.TextArea
              placeholder="Describe the bugs you found..."
              className="body-s p-5 text-neutral-black"
              maxLength={1500}
              styles={{
                textarea: {
                  height: '200px'
                }
              }}
            ></Input.TextArea>
          </Form.Item>
          <Form.Item name={'files'}>
            <Upload
              {...uploadProps}
              accept="image/*"
              style={{ backgroundColor: 'transparent' }}
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              itemRender={(originNode, file, fileList, actions) => {
                return (
                  <div className="relative h-[64px] w-[64px]">
                    <div className="h-full w-full overflow-hidden rounded-[10px] border border-neutral-medium-gray">
                      <Image alt={file.fileName} src={file.thumbUrl} className="block h-full w-full"></Image>
                    </div>

                    <svg
                      className="absolute -right-2 -top-2 cursor-pointer"
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        setFileList(fileList.filter((item) => file.uid !== item.uid));
                      }}
                    >
                      <circle
                        cx="10.9379"
                        cy="11.1455"
                        r="7.71853"
                        transform="rotate(135 10.9379 11.1455)"
                        fill="#FF624D"
                      />
                      <rect
                        x="14.7305"
                        y="13.5166"
                        width="2.01353"
                        height="8.72529"
                        rx="1.00676"
                        transform="rotate(135 14.7305 13.5166)"
                        fill="white"
                      />
                      <rect
                        x="8.5625"
                        y="14.9414"
                        width="2.01353"
                        height="8.72529"
                        rx="1.00676"
                        transform="rotate(-135 8.5625 14.9414)"
                        fill="white"
                      />
                    </svg>
                  </div>
                );
              }}
              className={`${
                !fileList.length
                  ? 'w-full [&>.ant-upload-list-picture-card>.ant-upload-select]:w-[100%!important] [&>.ant-upload-list-picture-card]:w-full'
                  : `
                    [&>.ant-upload-list-picture-card>.ant-upload-list-item-container]:h-[64px!important]
                    [&>.ant-upload-list-picture-card>.ant-upload-list-item-container]:w-[64px!important]
                    [&>.ant-upload-list-picture-card>.ant-upload-select]:h-[64px!important]
                    [&>.ant-upload-list-picture-card>.ant-upload-select]:w-[64px!important]`
              }`}
            >
              {!fileList.length ? FullUploadButton : UploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={loading}
              disabled={loading}
              className="body-l py-[16px] text-neutral-black"
              iconPosition="right"
              icon={
                <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 3L10.5 8.29412L3 13.5882"
                    stroke="#0B0B0B"
                    strokeWidth="1.76471"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              block
              onClick={() => submit()}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
});

export default MobBugFeedbackModal;

MobBugFeedbackModal.displayName = 'MobBugFeedbackModal';
