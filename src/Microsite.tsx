import { useContext } from "react";
import SmartMeterAccordion from "./SmartMeterAccordion";
import { UserContext } from "./user";

const assetPathPrefix = "/assets";
const imgProperty11 = `${assetPathPrefix}/19dba.svg`;
const imgArrowTail = `${assetPathPrefix}/b15c7.svg`;
const imgArrowTip = `${assetPathPrefix}/9b20e.svg`;
const imgArrowTail1 = `${assetPathPrefix}/b2a3e.svg`;
const imgArrowTip1 = `${assetPathPrefix}/39063.svg`;
const imgArrowTail2 = `${assetPathPrefix}/57d1a.svg`;
const imgTomatoEnergyLogoSymbol = `${assetPathPrefix}/2a445.svg`;
const imgArrowSimple = `${assetPathPrefix}/32294.svg`;
const imgAccordionDivider = `${assetPathPrefix}/b49a3.svg`;
const imgTomatoEnergyLogoSymbol1 = `${assetPathPrefix}/b05f9.svg`;
const imgSpinnerAnimation = `${assetPathPrefix}/81b89.svg`;
const imgAccordionDivider1 = `${assetPathPrefix}/1cb08.svg`;
const imgAccordionDivider2 = `${assetPathPrefix}/605a7.svg`;
const imgMpanMeter = `${assetPathPrefix}/c59ab.svg`;
const imgLogoWhiteAndColour = `${assetPathPrefix}/1596b.svg`;
const imgTomatoEnergyLogo = `${assetPathPrefix}/5eda5.svg`;
const imgVector = `${assetPathPrefix}/c1ba3.svg`;
const imgOverlay = `${assetPathPrefix}/17331.svg`;
const imgLines = `${assetPathPrefix}/cec8b.svg`;
const imgVector1 = `${assetPathPrefix}/a309c.svg`;
const img6 = `${assetPathPrefix}/631fa.svg`;
const img7 = `${assetPathPrefix}/d717c.svg`;
const img8 = `${assetPathPrefix}/c973e.svg`;

type TomatoSymbolAnimationProps = {
  className?: string;
  property1?: "1";
};

function TomatoSymbolAnimation({ className, property1 = "1" }: TomatoSymbolAnimationProps) {
  return (
    <div className={className || "h-[90px] relative w-[69px]"} data-node-id="2:1189">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty11} />
    </div>
  );
}

type ArrowChipProps = {
  className?: string;
  hasTail?: boolean;
  hasTip?: boolean;
  label?: string;
  property1?: "inactive" | "completed";
};

function ArrowChip({
  className,
  hasTail = true,
  hasTip = true,
  label = "INITIATED",
  property1 = "completed",
}: ArrowChipProps) {
  const isCompleted = property1 === "completed";
  const isInactive = property1 === "inactive";
  return (
    <div
      className={
        className || `content-stretch flex items-center relative ${isInactive ? "opacity-40" : ""}`
      }
      id={isInactive ? "node-2_282" : "node-2_267"}
    >
      {isCompleted && hasTail && (
        <div
          className="h-[28px] relative shrink-0 w-[13.5px]"
          data-node-id="2:268"
          data-name="arrow tail"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowTail} />
        </div>
      )}
      {isCompleted && (
        <div
          className="content-stretch flex items-center justify-center p-[8px] relative shrink-0"
          data-node-id="2:269"
          data-name="Button_text"
        >
          <div
            aria-hidden
            className="absolute bg-[rgba(0,181,125,0.05)] inset-0 pointer-events-none"
          />
          <p
            className="[word-break:break-word] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] relative shrink-0 text-[#00a874] text-[10px] text-center uppercase whitespace-nowrap"
            data-node-id="2:270"
          >
            {label}
          </p>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_1.5px_0px_0px_rgba(0,181,125,0.3)]" />
        </div>
      )}
      {isCompleted && hasTip && (
        <div
          className="h-[28px] relative shrink-0 w-[15.171px]"
          data-node-id="2:271"
          data-name="arrow tip"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowTip} />
        </div>
      )}
      {isInactive && hasTail && (
        <div
          className="h-[28px] relative shrink-0 w-[13.5px]"
          data-node-id="2:283"
          data-name="arrow tail"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowTail1} />
        </div>
      )}
      {isInactive && (
        <div
          className="content-stretch flex items-center justify-center p-[8px] relative shrink-0"
          data-node-id="2:284"
          data-name="Button_text"
        >
          <div
            aria-hidden
            className="absolute bg-[rgba(0,74,75,0.07)] inset-0 pointer-events-none"
          />
          <p
            className="[word-break:break-word] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] relative shrink-0 text-[#004a4b] text-[10px] text-center uppercase whitespace-nowrap"
            data-node-id="2:285"
          >
            {label}
          </p>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_1.5px_1px_0px_rgba(0,0,0,0.2)]" />
        </div>
      )}
      {isInactive && hasTip && (
        <div
          className="h-[28px] relative shrink-0 w-[15.171px]"
          data-node-id="2:286"
          data-name="arrow tip"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowTip1} />
        </div>
      )}
    </div>
  );
}

type ArrowChipAnimationShadowProps = {
  className?: string;
  property1?: "1";
};

function ArrowChipAnimationShadow({ className, property1 = "1" }: ArrowChipAnimationShadowProps) {
  return (
    <div className={className || "content-stretch flex items-start relative"} data-node-id="2:372">
      <div
        className="content-stretch drop-shadow-[1px_1px_0px_rgba(0,75,58,0.4)] flex items-center relative shrink-0"
        data-node-id="2:373"
        data-name="arrow chip"
      >
        <div
          className="h-[28px] relative shrink-0 w-[13.5px]"
          data-node-id="I2:373;14743:21452"
          data-name="arrow tail"
        >
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowTail2} />
        </div>
        <div
          className="bg-[#c2ea00] content-stretch flex items-center justify-center px-[20px] py-[8px] relative shrink-0"
          data-node-id="I2:373;14743:21453"
          data-name="Button_text"
        >
          <p
            className="[word-break:break-word] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] relative shrink-0 text-[#00364b] text-[10px] text-center uppercase whitespace-nowrap"
            data-node-id="I2:373;14743:21454"
          >
            approved
          </p>
        </div>
      </div>
    </div>
  );
}

type SmartMeterProps = {
  className?: string;
  property1?: "Step - 1";
};

function SmartMeter({ className, property1 = "Step - 1" }: SmartMeterProps) {
  return (
    <div
      className={
        className || "content-stretch flex flex-col gap-[14px] items-start relative w-[334px]"
      }
      data-node-id="2:1231"
    >
      <div
        className="bg-[rgba(0,181,125,0.05)] border border-[#00b57d] border-solid content-stretch flex items-center justify-between pr-[4px] relative rounded-[6px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] shrink-0 w-full"
        data-node-id="2:1232"
        data-name="progress bar"
      >
        <div className="flex flex-row items-center self-stretch" data-node-id="2:1233">
          <div className="bg-[#00b57d] content-stretch drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)] flex gap-[8px] h-full items-center justify-center p-[4px] relative rounded-[6px] shrink-0 w-[37px]">
            <p
              className="[word-break:break-word] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] relative shrink-0 text-[10px] text-center text-white uppercase whitespace-nowrap"
              data-node-id="2:1234"
            >
              10%
            </p>
          </div>
        </div>
        <div
          className="h-[17.715px] relative shrink-0 w-[14px]"
          data-node-id="2:1236"
          data-name="TomatoEnergy_logo_symbol"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgTomatoEnergyLogoSymbol}
          />
        </div>
      </div>
      <p
        className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium'] font-medium leading-[18px] relative shrink-0 text-[#004a4b] text-[10px] w-full"
        data-node-id="2:1237"
      >
        Follow the progress of your switch:
      </p>
      <div
        className="content-stretch drop-shadow-[0px_4px_5px_rgba(0,0,0,0.1)] flex flex-col gap-px items-end relative shrink-0 w-full"
        data-node-id="2:1238"
        data-name="00Application"
      >
        <div
          className="border-[rgba(0,74,75,0.2)] border-b border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-full"
          data-node-id="2:1239"
          data-name="Accordian Row"
        >
          <div
            className="bg-[#f8f8f8] content-stretch flex items-center justify-between px-[20px] py-[10px] relative shrink-0 w-full"
            data-node-id="I2:1239;13844:60964"
            data-name="Accordion Cell Content"
          >
            <div
              className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-w-px relative"
              data-node-id="I2:1239;14297:39934"
              data-name="Accordion text"
            >
              <div
                className="border border-[#00b57d] border-dashed content-stretch flex flex-col items-center justify-center pb-px relative rounded-[100px] shrink-0 size-[20px]"
                data-node-id="I2:1239;14297:46782"
                data-name="stepper/cell"
              >
                <p
                  className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold'] font-semibold leading-[14px] relative shrink-0 text-[#004a4b] text-[12px] text-center w-[20px]"
                  data-node-id="I2:1239;14297:46782;1614:823"
                >
                  1
                </p>
              </div>
              <p
                className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] min-w-px relative text-[#004a4b] text-[10px] uppercase"
                data-node-id="I2:1239;13844:60965"
              >
                Submitted application
              </p>
            </div>
            <div
              className="flex flex-row items-center self-stretch"
              data-node-id="I2:1239;13844:60966"
            >
              <div className="flex h-full items-center justify-center relative shrink-0">
                <div className="flex-none h-full rotate-180">
                  <div className="aspect-[30/30] relative size-full" data-name="Arrow_simple">
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgArrowSimple}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="h-0 relative shrink-0 w-full"
            data-node-id="I2:1239;13844:60967"
            data-name="Accordion Divider"
          >
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgAccordionDivider} />
            </div>
          </div>
        </div>
        <div
          className="bg-[#f8f8f8] content-stretch flex flex-col items-start px-[12px] py-[16px] relative shrink-0 w-full"
          data-node-id="2:1240"
          data-name="Accordian Content Section"
        >
          <div
            className="content-stretch flex flex-col gap-[24px] items-center overflow-clip relative shrink-0 w-full"
            data-node-id="2:1241"
            data-name="Accordian Content Container"
          >
            <div
              className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
              data-node-id="2:1242"
              data-name="Stage Content Container"
            >
              <div
                className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full"
                data-node-id="2:1243"
                data-name="Stage Title Container"
              >
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[0] min-w-px relative text-[#004a4b] text-[14px]"
                  data-node-id="2:1244"
                >
                  <span className="leading-[20px]">
                    Thanks for choosing
                    <br aria-hidden />
                  </span>
                  <span className="leading-[20px] text-[#ff4740]">Tomato Energy</span>
                </p>
                <div
                  className="h-[18px] relative shrink-0 w-[14.225px]"
                  data-node-id="2:1245"
                  data-name="TomatoEnergy_logo_symbol"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    src={imgTomatoEnergyLogoSymbol1}
                  />
                </div>
              </div>
              <p
                className="[word-break:break-word] font-['Plus_Jakarta_Sans:Medium'] font-medium leading-[20px] relative shrink-0 text-[#324a5e] text-[14px] w-full"
                data-node-id="2:1246"
              >{`We've received your switch request and are preparing to start the process.`}</p>
            </div>
            <div
              className="relative shrink-0 size-[30px]"
              data-node-id="2:1247"
              data-name="Spinner-animation"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgSpinnerAnimation}
              />
            </div>
          </div>
        </div>
        <div
          className="border-[rgba(0,74,75,0.2)] border-b border-solid content-stretch flex flex-col h-[40px] items-start justify-center overflow-clip relative shrink-0 w-full"
          data-node-id="2:1248"
          data-name="Accordian Row"
        >
          <div
            className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[10px] relative shrink-0 w-full"
            data-node-id="I2:1248;13844:61046"
            data-name="Accordion Cell Content"
          >
            <div
              className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-w-px relative"
              data-node-id="I2:1248;14297:39935"
              data-name="Accordion text"
            >
              <div
                className="bg-[#f8f8f8] border border-[rgba(0,74,75,0.2)] border-solid content-stretch flex flex-col items-center justify-center pb-px relative rounded-[100px] shrink-0 size-[20px]"
                data-node-id="I2:1248;14297:46783"
                data-name="stepper/cell"
              >
                <p
                  className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold'] font-semibold leading-[14px] relative shrink-0 text-[12px] text-[rgba(0,74,75,0.7)] text-center w-[20px]"
                  data-node-id="I2:1248;14297:46783;1614:814"
                >
                  2
                </p>
              </div>
              <p
                className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] min-w-px relative text-[#004a4b] text-[10px] uppercase"
                data-node-id="I2:1248;13844:61047"
              >
                SWITCHing
              </p>
            </div>
          </div>
          <div
            className="h-0 relative shrink-0 w-full"
            data-node-id="I2:1248;13844:61049"
            data-name="Accordion Divider"
          >
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgAccordionDivider} />
            </div>
          </div>
        </div>
        <div
          className="bg-[#f8f8f8] border-[rgba(0,74,75,0.2)] border-b border-solid content-stretch flex flex-col h-[39.238px] items-start relative shrink-0 w-full"
          data-node-id="2:1249"
          data-name="Accordian Row"
        >
          <div
            className="border-[rgba(0,74,75,0.2)] border-b border-solid content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px overflow-clip relative w-[259px]"
            data-node-id="2:1250"
            data-name="Accordian Row"
          >
            <div
              className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[10px] relative shrink-0 w-full"
              data-node-id="I2:1250;13844:61046"
              data-name="Accordion Cell Content"
            >
              <div
                className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-w-px relative"
                data-node-id="I2:1250;14297:39935"
                data-name="Accordion text"
              >
                <div
                  className="bg-[#f8f8f8] border border-[rgba(0,74,75,0.2)] border-solid content-stretch flex flex-col items-center justify-center pb-px relative rounded-[100px] shrink-0 size-[20px]"
                  data-node-id="I2:1250;14297:46783"
                  data-name="stepper/cell"
                >
                  <p
                    className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold'] font-semibold leading-[14px] relative shrink-0 text-[12px] text-[rgba(0,74,75,0.7)] text-center w-[20px]"
                    data-node-id="I2:1250;14297:46783;1614:814"
                  >
                    3
                  </p>
                </div>
                <p
                  className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] min-w-px relative text-[#004a4b] text-[10px] uppercase"
                  data-node-id="I2:1250;13844:61047"
                >
                  supply starts
                </p>
              </div>
            </div>
            <div
              className="h-0 relative shrink-0 w-full"
              data-node-id="I2:1250;13844:61049"
              data-name="Accordion Divider"
            >
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgAccordionDivider1} />
              </div>
            </div>
          </div>
          <div
            className="h-0 relative shrink-0 w-full"
            data-node-id="2:1251"
            data-name="Accordion Divider"
          >
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgAccordionDivider2} />
            </div>
          </div>
        </div>
        <div
          className="border-[rgba(0,74,75,0.2)] border-b border-solid content-stretch flex flex-col h-[40px] items-start justify-center overflow-clip relative shrink-0 w-full"
          data-node-id="2:1253"
          data-name="Accordian Row"
        >
          <div
            className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[10px] relative shrink-0 w-full"
            data-node-id="I2:1253;13844:61046"
            data-name="Accordion Cell Content"
          >
            <div
              className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-w-px relative"
              data-node-id="I2:1253;14297:39935"
              data-name="Accordion text"
            >
              <div
                className="bg-[#f8f8f8] border border-[rgba(0,74,75,0.2)] border-solid content-stretch flex flex-col items-center justify-center pb-px relative rounded-[100px] shrink-0 size-[20px]"
                data-node-id="I2:1253;14297:46783"
                data-name="stepper/cell"
              >
                <p
                  className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold'] font-semibold leading-[14px] relative shrink-0 text-[12px] text-[rgba(0,74,75,0.7)] text-center w-[20px]"
                  data-node-id="I2:1253;14297:46783;1614:814"
                >
                  4
                </p>
              </div>
              <p
                className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] min-w-px relative text-[#004a4b] text-[10px] uppercase"
                data-node-id="I2:1253;13844:61047"
              >
                Meter Reading
              </p>
            </div>
          </div>
          <div
            className="h-0 relative shrink-0 w-full"
            data-node-id="I2:1253;13844:61049"
            data-name="Accordion Divider"
          >
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgAccordionDivider} />
            </div>
          </div>
        </div>
        <div
          className="content-stretch flex flex-col h-[40px] items-start justify-center overflow-clip relative rounded-bl-[20px] rounded-br-[20px] shrink-0 w-full"
          data-node-id="2:1254"
          data-name="Accordian Row"
        >
          <div
            className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[10px] relative shrink-0 w-full"
            data-node-id="I2:1254;13844:61210"
            data-name="Accordion Cell Content"
          >
            <div
              className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-center min-w-px relative"
              data-node-id="I2:1254;14297:39936"
              data-name="Accordion text"
            >
              <div
                className="bg-[#f8f8f8] border border-[rgba(0,74,75,0.2)] border-solid content-stretch flex flex-col items-center justify-center pb-px relative rounded-[100px] shrink-0 size-[20px]"
                data-node-id="I2:1254;14297:46785"
                data-name="stepper/cell"
              >
                <p
                  className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold'] font-semibold leading-[14px] relative shrink-0 text-[12px] text-[rgba(0,74,75,0.7)] text-center w-[20px]"
                  data-node-id="I2:1254;14297:46785;1614:814"
                >
                  5
                </p>
              </div>
              <p
                className="[word-break:break-word] flex-[1_0_0] font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[12px] min-w-px relative text-[#004a4b] text-[10px] uppercase"
                data-node-id="I2:1254;13844:61211"
              >
                Switch Completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Microsite() {
  const user = useContext(UserContext);
  return (
    <div className="bg-white relative size-full" data-node-id="2:1434" data-name="microsite">
      <div className="contents" data-name="landing content">
        <div
          className="-translate-x-1/2 absolute content-stretch flex flex-col gap-x-[12px] gap-y-[16px] items-center left-1/2 px-[30px] top-[131px] w-[320px]"
          data-node-id="2:1436"
          data-name="Welcome info"
        >
          <div
            className="[word-break:break-word] content-stretch flex flex-col font-['Plus_Jakarta_Sans:Regular'] font-normal gap-x-[2px] gap-y-[4px] items-start relative shrink-0 text-center w-fit"
            data-node-id="2:1437"
          >
            <p
              className="leading-[0] relative shrink-0 text-[#004a4b] text-[0px] w-full"
              data-node-id="2:1438"
            >
              <span className="leading-[22px] text-[16px]">{`Hello, ${user.title} `}</span>
              <span className="font-['Plus_Jakarta_Sans:Bold'] font-bold leading-[22px] text-[16px]">
                {user.surname}
              </span>
            </p>
            <p
              className="leading-[18px] relative shrink-0 text-[12px] text-[rgba(0,74,75,0.7)] w-fit"
              data-node-id="2:1439"
            >{user.address}</p>
          </div>
          <div
            className="bg-[rgba(0,182,125,0)] border border-[#00b57d] border-solid content-stretch flex items-center justify-center px-[12px] py-[2px] relative rounded-[2px] shrink-0"
            data-node-id="2:1440"
          >
            <div
              className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0"
              data-node-id="2:1441"
            >
              <div
                className="h-[14px] relative shrink-0 w-[16px]"
                data-node-id="2:1442"
                data-name="Mpan meter"
              >
                <div className="absolute inset-[-2.5%_-2.19%]">
                  <img alt="" className="block max-w-none size-full" src={imgMpanMeter} />
                </div>
              </div>
              <p
                className="[word-break:break-word] font-['Plus_Jakarta_Sans:Light'] font-[350] leading-[14px] relative shrink-0 text-[#00b57d] text-[10px] whitespace-nowrap"
                data-node-id="2:1443"
                style={{ fontFeatureSettings: '"lnum" 1, "pnum" 1' }}
              >
                MPAN:
              </p>
              <p
                className="[word-break:break-word] font-['Plus_Jakarta_Sans:SemiBold'] font-semibold leading-[20px] relative shrink-0 text-[#00b57d] text-[12px] whitespace-nowrap"
                data-node-id="2:1444"
              >
                {user.mpan}
              </p>
            </div>
          </div>
          {/* In flow after the MPAN box, so the gap holds however many lines the address wraps to */}
          <SmartMeterAccordion className="-mt-1 !w-[350px] shrink-0" />
        </div>
      </div>
      <div
        className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col items-center left-1/2 max-w-[393px] px-[40px] py-[12px] top-[74px] w-[320px]"
        data-node-id="2:1445"
        data-name="Navbar"
      >
        <div
          className="h-[20px] relative shrink-0 w-[128.834px]"
          data-node-id="2:1446"
          data-name="Logo/White_and_Colour"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgTomatoEnergyLogo}
          />
        </div>
      </div>
      <div
        className="absolute contents inset-[87.15%_-2.5%_-8.62%_-8.13%]"
        data-node-id="2:1447"
        data-name="tomato footer"
      >
        <div
          className="absolute flex inset-[90.85%_4%_-8.62%_63.06%] items-center justify-center"
          data-node-id="2:1448"
          style={{ containerType: "size" }}
        >
          <div className="flex-none h-[hypot(-17.7161cqw,80.1566cqh)] rotate-13 w-[hypot(82.2839cqw,19.8434cqh)]">
            <div
              className="drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.1)] relative size-full"
              data-name="5"
            >
              <div
                className="absolute inset-[4.14%_0_0_0]"
                data-node-id="I2:1448;1573:818"
                data-name="Vector"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgVector}
                />
              </div>
              <div
                className="absolute inset-[4.14%_0_0_0]"
                data-node-id="I2:1448;1574:625"
                data-name="overlay"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgOverlay}
                />
              </div>
              <div
                className="absolute inset-[21.74%_10.91%_12.58%_23.57%] mix-blend-multiply"
                data-node-id="I2:1448;1573:822"
                data-name="lines"
              >
                <div className="absolute inset-[-0.92%_-0.86%]">
                  <img alt="" className="block max-w-none size-full" src={imgLines} />
                </div>
              </div>
              <div
                className="absolute inset-[0_26.61%_57.8%_24.38%]"
                data-node-id="I2:1448;1573:831"
                data-name="Vector"
              >
                <div className="absolute inset-[0_0_-2.85%_0]">
                  <img alt="" className="block max-w-none size-full" src={imgVector1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute flex inset-[88.2%_70.4%_-8.09%_-8.13%] items-center justify-center"
          data-node-id="2:1449"
          style={{ containerType: "size" }}
        >
          <div className="-scale-x-100 flex-none h-[hypot(-14.7722cqw,82.597cqh)] rotate-[10.82deg] w-[hypot(-85.2278cqw,-17.403cqh)]">
            <div className="relative size-full" data-name="6">
              <div className="absolute inset-[0_-0.95%_-3.16%_-0.95%]">
                <img alt="" className="block max-w-none size-full" src={img6} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute flex inset-[87.15%_55.55%_-2.67%_17.5%] items-center justify-center"
          data-node-id="2:1450"
          style={{ containerType: "size" }}
        >
          <div className="-scale-x-100 flex-none h-[hypot(17.66cqw,83.2965cqh)] rotate-[-11.72deg] w-[hypot(-82.34cqw,16.7035cqh)]">
            <div className="relative size-full" data-name="7">
              <div className="absolute inset-[0_-1.1%_-4%_-1.38%]">
                <img alt="" className="block max-w-none size-full" src={img7} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute flex inset-[92.96%_-2.5%_-2.48%_85.94%] items-center justify-center"
          data-node-id="2:1451"
          style={{ containerType: "size" }}
        >
          <div className="flex-none h-[hypot(-20.2594cqw,80.8051cqh)] rotate-[13.8deg] w-[hypot(79.7406cqw,19.1949cqh)]">
            <div className="relative size-full" data-name="8">
              <div className="absolute inset-[-1.65%_0_-2.22%_-6.89%]">
                <img alt="" className="block max-w-none size-full" src={img8} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        className="-translate-x-1/2 [word-break:break-word] absolute font-['Plus_Jakarta_Sans:Medium'] font-medium leading-[18px] left-[calc(50%+0.5px)] text-[#004a4b] text-[12px] text-center top-[-7.9225%] w-[249px]"
        data-node-id="2:1452"
      >
        Thanks for choosing
        <br aria-hidden />
        Tomato Energy
      </p>
    </div>
  );
}
