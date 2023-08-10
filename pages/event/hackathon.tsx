import { NextPage } from 'next';
import PeopleJoined from '@/components/Common/PeopleJoined';
import { getRandomPeopleAvatars } from '@/helper/random';
import RightIcon from '@/components/Common/Icon/Right';
import SkipIcon from '@/components/Common/Icon/Skip';
import Image from 'next/image';
import BannerBg from '@/public/images/event/hackathon/banner_bg.jpg';
const formatSize = (s: number | string) => {
  if (typeof s === 'string') s = parseInt(s);
  return `${(s / 1728) * 100}vw`;
};

const originator: { name: string; status: string }[] = new Array(14).fill({
  name: 'Jim Rogers',
  status: 'International Investor and Author'
});
const investor: { name: string; status: string }[] = new Array(12).fill({
  name: 'Jim Rogers',
  status: 'International Investor and Author'
});

const HackathonPage: NextPage<any> = (props) => {
  // const { nowCards, syntaxCards, tracksCards } = props;

  return (
    <div className="w-full bg-[#1F1920] flex flex-col justify-center items-center">
      <div className="relative w-full left-0 -top-[4.875rem]">
        <Image
          src={BannerBg}
          alt="hackathon"
          className="
          w-full object-cover z-0 absolute top-0 left-0
          "
        ></Image>
        <div
          style={{
            top: `${formatSize(224)}`,
            fontSize: `${formatSize(318.408)}`
          }}
          className={`
        absolute z-[5] m-auto top-[]  overflow-hidden w-full
        text-[#cd9df24c] text-center leading-[120%]
        `}
        >
          2023
        </div>
        <div
          className={`zz
          absolute w-full z-[5] m-auto top-[15.375rem] flex-col justify-center
          text-white text-center text-[6.9375rem] leading-[97%]
          `}
          style={{
            top: `${formatSize(246)}`,
            fontSize: `${formatSize(111.36)}`,
            textShadow:
              '0px 3.9771456718444824px 67.6114730834961px rgba(0, 0, 0, 0.25)'
          }}
        >
          <p>SevenX</p>
          <p className="flex items-center justify-center">
            <span style={{ fontSize: `${formatSize(36)}` }}>8.26</span>
            <span>{`->`}</span>
            <span style={{ fontSize: `${formatSize(36)}` }}>9.17</span>
          </p>
          <p>*Nitro*</p>
          <p>{`[hackathon]`}</p>
        </div>
        <div
          style={{
            top: `${formatSize(773)}`,
            fontSize: `${formatSize(36)}`
          }}
          className="absolute w-full  text-center  leading-[100%] text-white"
        >
          2023.8.26-2023.9.17
        </div>
        <div
          style={{
            top: `${formatSize(1054)}`,
            fontSize: `${formatSize(39.3936)}`,
            lineHeight: `${formatSize(29.152)}`,
            gap: `${formatSize(67)}`
          }}
          className="absolute left-[50%] -translate-x-[50%] flex flex-col  justify-center items-center text-white font-semibold"
        >
          <button
            style={{
              width: `${formatSize(431)}`,
              padding: `${formatSize(18)}`,
              borderWidth: `${formatSize(3)}`,
              borderRadius: `${formatSize(50)}`,
              gap: `${formatSize(8)}`
            }}
            className="flex border-white "
          >
            <span>{`->`}</span>
            <span>Register Now</span>
          </button>
          <button
            style={{
              width: `${formatSize(431)}`,
              padding: `${formatSize(18)}`,
              borderWidth: `${formatSize(3)}`,
              borderRadius: `${formatSize(50)}`,
              gap: `${formatSize(8)}`
            }}
            className="flex border-white"
          >
            <span>{`->`}</span>
            <span>Partner With US</span>
          </button>
          <p
            style={{
              fontSize: `${formatSize(27.5264)}`,
              lineHeight: `${formatSize(20.3696)}`
            }}
            className="font-[MiSans]"
          >
            报名截止：2023.8.25
          </p>
        </div>
      </div>
      <div
        style={{
          marginTop: `${formatSize(1840)}`,
          width: `${formatSize(1298)}`
        }}
        className="relative flex flex-col items-center justify-center"
      >
        <div
          style={{
            width: `${formatSize(1146)}`
          }}
          className="flex flex-col items-center justify- overflow-hidden"
        >
          <div className="text-[39.394px] text-[#AA83C8] relative font-semibold w-full pb-[33px] text-center bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="rotate-90">{`>>`}</div>
          </div>
          <div className="w-full text-center pt-[50px] pb-[60px] flex flex-col gap-[30px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-[18px] text-[#87689E] text-center">
                ABOUT HAACKATHON
              </p>
              <p className="text-[2.5rem] font-bold leading-[120%] text-white text-center">
                Hackathon&nbsp;主题:
              </p>
            </div>
            <ul className="text-white text-center text-[28px] leading-[46px]">
              <li className="">1. Fully On-Chain Game</li>
              <li className="">2. Web3+AI Applications</li>
            </ul>
            <div
              className="
              px-[36px] py-1 w-fit flex justify-center items-center self-center
              text-[20px]  text-white
              border-[3px] rounded-full
            "
            >
              奖金：20000 USD
            </div>
          </div>
          <div className="w-full text-center pt-[60px] pb-[50px] flex flex-col gap-[7.34px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[#cd9df299] text-[18px] leading-[120%]"
            >{`co-host ->`}</div>
            <div className="text-white text-[40px] font-bold leading-[120%]">
              主办方
            </div>
          </div>
          <div className="w-full text-center pt-[60px] pb-[60px] flex flex-col gap-[50px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-white text-[40px] font-bold leading-[120%]"
            >
              赛程安排
            </div>
            <div className="text-white text-[28px] font-black leading-[46px]">
              <p>项目报名 Now - 8.23</p>
              <p>开幕式 8.26</p>
              <p>Hackathon 8.27 - 9.13</p>
              <p>Apollo Day 9.16</p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[60px] pb-[60px] flex flex-col gap-[50px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[40px] font-bold leading-[120%]"
            >
              Hackathon 主题
            </div>
            <div className="text-left max-w-[65.6875rem] text-[1.625rem] flex flex-col gap-[50px] self-center leading-[181.5%]">
              <div className="text-[20px] font-black text-center border px-[28.67px] w-fit self-center rounded-full leading-[182%]">
                Theme1: FULLY ON-CHAIN GAME
              </div>
              <p>
                我们相信基于可编程性、去中心化、无许可性等 Web3 原生理念被创建
                fully on-chain game 将会探索出一条独立的成长路径，为 Web3
                游戏带来真正的奇点。我们看好 fully on-chain game
                的三个环节，分别是基础设施（包括引擎，抽象协议、中间件及各类功能模块）、内容（包括不同genre的游戏或实验内容）和发行（通过去中心化、可组合和经济模型对发行方式的颠覆）。
              </p>
            </div>
            <div className="text-left max-w-[65.6875rem] text-[1.625rem] flex flex-col gap-[50px] mt-[50px] self-center leading-[253%]">
              <div className="text-[20px] font-black text-center border px-[28.67px] w-fit self-center rounded-full leading-[182%]">
                Theme2：Web3+AI APPLICATION
              </div>
              <p>
                随着区块链技术在基础设施、中间件和经济模型等各个层次取得的快速突破，伴随AI技术中大语言模型的持续迭代，两个领域正在发生不可阻挡的融合，同时走入开发者和大众用户的视野。
              </p>
              <p className="mt-[40px]">
                在 Web3+AI 这个主题中，除了已经看到的例如 ZKML
                等基础设施方向的创新叙事，我们认为Web3+AI 同样也可以为 C
                端带来无穷无尽的想象力，以全新的构建方式、交互逻辑和激励模型，对传统的移动互联网产品进行颠覆，在移动互利网创新乏力、流量枯竭的现状下，为
                C 端市场带来新的生机。我们看好一切Web3+AI
                APPLICATION的可能性，包括各个垂直场景，例如：金融，NFT，社交，游戏等等。
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[60px] pb-[60px] flex flex-col gap-[50px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[40px] font-bold leading-[120%]"
            >
              About SevenX & Nitro
            </div>
            <div className="text-left max-w-[66.5rem] text-[1.625rem] flex flex-col gap-[50px] self-center leading-[253%]">
              <p>
                SevenX
                Venture成立于2020年，是一只以亚洲+美国双边市场为根据地的Web3基金，目前共管理直投基金3支、FoF基金1支，总管理规模接近3亿美元。
              </p>
              <p className="mt-[40px]">
                Infra：Near, Arweave, Aurora, Orb, Space&Time, Hyper Oracle, Red
                Stone, EthStorage, Particle, Kwil, Herodotus, Trusta, GoPlus,
                Footprint Defi：DODO, DAO Maker, Orderly, CowSwap, RageTrade,
                Panoptic, DeBank Wallet: Zerion, Bitkeep Gaming: YGG, Xterio,
                Caldera, Nefta, AI Arena, Azuro Protocol, Ignite Tournaments, OP
                Games, Citvatas, Space Nation, Block Lords, Matr1x Social: Mask
                Network, RSS3, Cyberconnect, ReadON, Clique, QuestN, HackMD
              </p>
              <p className="mt-[40px]">
                Nitro 是 SevenX Ventures 创办的 Hackathon/Hacker House
                品牌，目的是通过 SevenX Ventures
                的丰富全球化资源，深刻的行业认知和成熟的赋能系统，为最优秀的
                Web3 创业团队提供展示、比拼和发展的舞台。Nitro 系列
                Hackathon/Hacker House 将于每年举办 2
                次活动，聚焦当前市场最前沿，最有潜力的叙事和主题，以求通过此品牌推动
                Web3 的前沿创新，并成为 Web3 新物种的发现者。
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[60px] pb-[60px] flex flex-col gap-[50px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div
              // style={{ color: '#cd9df299' }}
              className="text-[40px] font-bold leading-[120%]"
            >
              Co-Host 介绍
            </div>
            <div className="text-left max-w-[66.5rem] text-[1.625rem] flex flex-col self-center leading-[253%]">
              <p className="font-black">1. Moonshot Commons</p>
              <p className="font-black">2. HackQuest</p>
              <p className="font-black">3. MUD</p>
              <p>
                MUD is an advanced framework developed for crafting
                sophisticated Ethereum applications. By integrating a
                comprehensive software stack, MUD streamlines the construction
                of EVM applications.
              </p>
              <p className="font-black">4. Dojo</p>
              <p>
                Dojo is a provable game engine with an integrated toolchain,
                designed for creating onchain games and autonomous worlds using
                Cairo 1.0. It employs an entity component system and a diamond
                pattern, facilitating a modular, scalable world. Worlds grow via
                the addition of Components (state) and Systems (logic).
              </p>
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[60px] pb-[60px] flex flex-col gap-[50px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="flex flex-col gap-[7.34px]">
              <div className="text-[#cd9df299] text-[18px] leading-[120%]">{`mentors ->`}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[40px] font-bold leading-[120%] text-[#CD9DF2]"
              >
                创始人&联合创始人
              </div>
            </div>

            <div className="text-left max-w-[66.5rem] pl-[21px] text-[1.625rem] flex self-center flex-wrap gap-x-[70.25px] gap-y-[21px]">
              {originator.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-[8.52px] ">
                    <div className="w-[104px] h-[104px] rounded-full border-[2px] border-[#CD9DF2]"></div>
                    <div className="flex flex-col max-w-[180px] gap-1">
                      <span className="text-[21px] font-semibold leading-[140%]">
                        {item.name}
                      </span>
                      <span className="text-[17.031px] font-semibold text-[#CD9DF2] leading-[125%]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[60px] pb-[60px] flex flex-col gap-[50px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="flex flex-col gap-[7.34px]">
              <div className="text-[#cd9df299] text-[18px] leading-[120%]">{`Venture Capital ->`}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[40px] font-bold leading-[120%] text-[#CD9DF2]"
              >
                创业投资人
              </div>
            </div>

            <div className="text-left max-w-[66.5rem] pl-[21px] text-[1.625rem] flex self-center flex-wrap gap-x-[70.25px] gap-y-[21px]">
              {investor.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-[8.52px] ">
                    <div className="w-[104px] h-[104px] rounded-full border-[2px] border-[#CD9DF2]"></div>
                    <div className="flex flex-col max-w-[180px] gap-1">
                      <span className="text-[21px] font-semibold leading-[140%]">
                        {item.name}
                      </span>
                      <span className="text-[17.031px] font-semibold text-[#CD9DF2] leading-[125%]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full text-center text-white  pt-[60px] pb-[60px] flex flex-col gap-[50px] relative bottom-line-default after:bg-[#CD9DF2] after:left-0">
            <div className="text-[14.67px] font-bold leading-[120%]">{`/*We choose to go to the Moon*/`}</div>
            <div className="flex flex-col gap-[20px]">
              <div className="text-[#cd9df299] text-[18px] leading-[120%]">{`OUR PARTNERS ->`}</div>
              <div
                // style={{ color: '#cd9df299' }}
                className="text-[40px] font-bold leading-[120%] text-[#CD9DF2]"
              >
                黑客松合作伙伴
              </div>
            </div>

            <div className="text-left max-w-[66.5rem] pl-[21px] text-[1.625rem] flex self-center flex-wrap gap-x-[70.25px] gap-y-[21px]">
              {originator.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-[8.52px] ">
                    <div className="w-[104px] h-[104px] rounded-full border-[2px] border-[#CD9DF2]"></div>
                    <div className="flex flex-col max-w-[180px] gap-1">
                      <span className="text-[21px] font-semibold leading-[140%]">
                        {item.name}
                      </span>
                      <span className="text-[17.031px] font-semibold text-[#CD9DF2] leading-[125%]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HackathonPage.displayName = 'HackathonPage';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default HackathonPage;