import { AbsatzS, ItemS } from "./InfoSectionStyle";

const MiddleFirstText = () => {
  return (
    <>
      <ItemS component="ol">
        <li>
          <AbsatzS variant="caption" component="p" role="text">
            Електронний поліс страхування має таку ж юридичну силу, як і
            паперовий. Електронне страхування та електронний підпис врегульовано
            на законодавчому рівні законами України
            <i> «Про електронну комерцію»</i> та
            <i> «Про електронні довірчі послуги»</i> та ін.
          </AbsatzS>
        </li>
        <li>
          <AbsatzS variant="caption" component="p" role="text">
            Нацкомфінпослуг затвердив впровадження е-полісу
            <strong> ОСЦПВ</strong> своїм Розпорядженням №3631 від 31.08.2017,
            можливість укладати електронний договір обов’язкового страхування
            автоцивільної відповідальності з’явилась в українських водіїв з 7
            лютого 2018 року.
          </AbsatzS>
        </li>
        <li>
          <AbsatzS variant="caption" component="p" role="text">
            Кабінет міністрів України закріпив у правилах дорожнього руху (ПДР)
            право <strong>підтверджувати</strong> наявність полісу автоцивілки з
            екрану гаджета. А пункт 2.1 ПДР доповнили наступним формулюванням:
            <span> &#34;</span>при наявності е-поліса водій може підтвердити
            його на <strong>електронному</strong> або паперовому носії
            <span> &#34;</span>.
          </AbsatzS>
        </li>
      </ItemS>
    </>
  );
};

export default MiddleFirstText;
