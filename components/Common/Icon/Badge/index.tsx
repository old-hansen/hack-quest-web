import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const BadgeIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width, height, color = '#333' } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 26 34"
      fill="none"
    >
      <g id="Silver Medal">
        <path
          id="Rectangle 8"
          d="M10.9648 18.8639L10.5318 18.6139L10.0318 19.4799L10.4648 19.7299L10.9648 18.8639ZM13.92 21.1474L14.353 21.3974L14.603 20.9644L14.17 20.7144L13.92 21.1474ZM7.41132 32.4208L6.95509 32.6254L7.35527 33.5179L7.84433 32.6708L7.41132 32.4208ZM5.99942 28.0499C5.88644 27.7979 5.59059 27.6852 5.33862 27.7982C5.08665 27.9112 4.97397 28.207 5.08695 28.459L5.99942 28.0499ZM10.4648 19.7299L13.67 21.5804L14.17 20.7144L10.9648 18.8639L10.4648 19.7299ZM13.487 20.8974L6.97831 32.1708L7.84433 32.6708L14.353 21.3974L13.487 20.8974ZM7.86756 32.2162L5.99942 28.0499L5.08695 28.459L6.95509 32.6254L7.86756 32.2162Z"
          fill="#3E3E3E"
        />
        <path
          id="Rectangle 9"
          d="M10.9648 18.8639L11.3979 19.1139L10.8979 19.9799L10.4648 19.7299L10.9648 18.8639ZM7.50966 17.4464L7.07665 17.1964L7.32665 16.7633L7.75966 17.0133L7.50966 17.4464ZM1.00095 28.7198L1.0519 29.2172L0.078876 29.3169L0.567937 28.4698L1.00095 28.7198ZM5.49223 27.757C5.76694 27.7289 6.01244 27.9288 6.04058 28.2035C6.06873 28.4782 5.86885 28.7237 5.59414 28.7518L5.49223 27.757ZM10.4648 19.7299L7.25966 17.8794L7.75966 17.0133L10.9648 18.8639L10.4648 19.7299ZM7.94267 17.6964L1.43396 28.9698L0.567937 28.4698L7.07665 17.1964L7.94267 17.6964ZM0.949994 28.2224L5.49223 27.757L5.59414 28.7518L1.0519 29.2172L0.949994 28.2224Z"
          fill="#3E3E3E"
        />
        <path id="Rectangle 10" d="M15.2852 19.2969L12.08 21.1474L18.5887 32.4208L20.4568 28.2544" stroke="#3E3E3E" />
        <path
          id="Rectangle 11"
          d="M15.2852 19.2969L18.4903 17.4464L24.9991 28.7198L20.4568 28.2544"
          stroke="#3E3E3E"
          strokeLinecap="round"
        />
        <circle id="Ellipse 3" cx="12.9958" cy="11.5348" r="11.0348" fill="#F4F4F4" stroke="#3E3E3E" />
        <g id="Mask Group">
          <g id="Group 482351">
            <path
              id="Vector"
              d="M16.5357 7.96793L16.4313 8.07235L16.4312 8.07224L16.5357 7.96793ZM16.5357 7.96793L16.6415 8.07372L16.6432 8.07207L16.5374 7.96628L16.6418 7.86185M16.5357 7.96793C17.4404 8.87383 18 10.1238 18 11.5L17.78 16.2806L13.0001 16.5C11.9634 16.5 11.0003 16.1845 10.2018 15.6442C9.98321 15.4963 9.77697 15.3316 9.58492 15.1519L9.58466 15.1522L9.58301 15.1538L9.47691 15.0478L9.37286 15.1526C9.33727 15.1172 9.30219 15.0814 9.26764 15.045M9.26764 15.045L9.26445 15.0482L9.37121 15.1542C9.5999 15.3814 9.8498 15.5872 10.1177 15.7684C10.9403 16.325 11.9325 16.65 13.0001 16.65L13.007 16.65L13.007 16.6498L17.7868 16.4304L17.9235 16.4242L17.9298 16.2875L18.1498 11.5069L18.1502 11.5L18.15 11.5C18.15 10.0823 17.5734 8.79465 16.6418 7.86185M9.26764 15.045C8.38936 14.1206 7.85 12.8711 7.85 11.5L7.84984 11.5L7.85016 11.4931L8.07019 6.71252L8.07648 6.57585L8.21315 6.56958L12.9932 6.35016L12.9932 6.35L13.0001 6.35C13.9094 6.35 14.764 6.58574 15.5057 6.9996C15.8803 7.20862 16.2261 7.46302 16.5356 7.75537L13.0001 6.5L8.22003 6.71942L8 11.5C8 12.872 8.55621 14.1186 9.45618 15.0238L9.37247 14.9401L9.37082 14.9418L9.26764 15.045ZM16.6418 7.86185L16.6434 7.8602C16.6434 7.86017 16.6434 7.86013 16.6433 7.86009M16.6418 7.86185C16.6417 7.86182 16.6417 7.86178 16.6417 7.86174L16.6433 7.86009M16.6433 7.86009C16.6433 7.86002 16.6432 7.85996 16.6431 7.85989M16.6433 7.86009L16.6431 7.85989M16.6431 7.85989C16.6407 7.85743 16.6382 7.85497 16.6357 7.85252L16.6431 7.85989ZM13.0035 6.65C13.8591 6.65059 14.6623 6.87254 15.3595 7.26158C15.7098 7.45701 16.0334 7.69464 16.3234 7.96761L16.4293 8.07367C17.3066 8.95195 17.8491 10.1631 17.85 11.4966L13.0035 6.65ZM13.0035 6.65L8.36358 6.86299L8.15 11.5034C8.15093 12.8437 8.69901 14.0604 9.58427 14.9397L9.69103 15.0458C9.87632 15.2188 10.0752 15.3774 10.2858 15.52C11.0595 16.0434 11.9921 16.3493 12.9967 16.35L13.0035 6.65Z"
              fill="#3E3E3E"
              stroke="#3E3E3E"
              strokeWidth="0.3"
            />
            <path
              id="Union"
              d="M13.0058 14.476C14.6972 14.476 15.9819 13.2502 15.9819 11.4999C15.9819 9.74961 14.6972 8.52383 13.0058 8.52383C11.3144 8.52383 10.0297 9.74961 10.0297 11.4999C10.0297 13.2502 11.3144 14.476 13.0058 14.476Z"
              fill="#F4F4F4"
              stroke="#3E3E3E"
              strokeWidth="0.3"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default BadgeIcon;
