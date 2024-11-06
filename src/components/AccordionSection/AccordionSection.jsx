import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SpriteSVG } from '../../images/SpriteSVG';
import {
  Accordions,
  AccordionsDetails,
  AccordionsSummary,
  ContAccordion,
} from './AccordionSectionStyle';
import { faq } from '../../assets/utils/faq';

const AccordionSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section>
      <ContAccordion id="питання-відповіді">
        <Typography variant="h2" className="main-title">
          Питання - Відповіді
        </Typography>
        {faq.map(
          (
            {
              question,
              answer,
              linkAttribute: { content, href, ...rest } = {},
            },
            index
          ) => {
            return (
              <Accordions
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionsSummary
                  aria-controls={index + '-content'}
                  id={index + '-header'}
                  expandIcon={
                    <Box
                      sx={{ stroke: '#FFFF', width: '32px', height: '32px' }}
                    >
                      <SpriteSVG name={'icon-chevron-down'} />
                    </Box>
                  }
                >
                  <Typography
                    variant="subtitle1"
                    component="h3"
                    className="subtitle"
                  >
                    {question}
                  </Typography>
                </AccordionsSummary>
                <AccordionsDetails>
                  <Typography variant="body1">
                    {!href
                      ? answer
                      : answer.split('{link}').reduce((acc, el, idx) => {
                          if (idx === 0) {
                            acc = acc.concat(
                              el,
                              <a href={href} {...rest}>
                                {content}
                              </a>
                            );
                          } else {
                            acc.push(el);
                          }

                          return acc;
                        }, [])}
                  </Typography>
                </AccordionsDetails>
              </Accordions>
            );
          }
        )}
      </ContAccordion>
    </section>
  );
};

// export default WithErrorCatchHandler(AccordionSection, 'AccordionSection');
export default AccordionSection;
