import { Fragment, useState } from 'react';
import { AbsatzS } from './InfoSectionStyle';
import PropTypes from 'prop-types';

const Text = ({ text, style = null, outsideEls = {} }) => {
  /* outsideEl = {links: <Link />, button: <Button />} */
  const [content] = useState(text);

  return content.map(
    ({ text, strongText, restText, outsideEl: { name } = {} }, index) => {
      if (outsideEls[name])
        return <Fragment key={index}>{outsideEls[name]}</Fragment>;

      const isTextLineBreak = text.includes('\n');
      const isStrongTextLineBreak = strongText.includes('\n');

      return (
        <AbsatzS
          key={index}
          variant="caption"
          component="p"
          role="text"
          style={style}
        >
          {isTextLineBreak
            ? text.split('\n').map((t, idx, arr) => (
                <>
                  {t}
                  {idx < arr.length && <br />}
                </>
              ))
            : text}
          {strongText &&
            (isStrongTextLineBreak ? (
              strongText.split('\n').map((sT, idx, arr) => (
                <>
                  {sT}
                  {idx < arr.length && <br />}
                </>
              ))
            ) : (
              <>
                {' '}
                <strong>{strongText}</strong>
              </>
            ))}
          {restText}
        </AbsatzS>
      );
    }
  );
};

export default Text;
Text.propTypes = {
  text: PropTypes.array.isRequired,
};
