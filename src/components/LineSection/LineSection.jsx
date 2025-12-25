import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getTariffPolicyChoose } from '../../redux/Calculator/selectors';
import { Line } from './LineSectionStyled';

export const LineSection = ({ isLoading }) => {
  const proposal = useSelector(getTariffPolicyChoose);
  const word = (companies) => {
    if (
      companies.length === 0 ||
      companies.length % 10 === 0 ||
      companies.length % 10 > 4
    )
      return 'пропозицій';
    if (companies.length === 1 || companies.length % 10 === 1)
      return 'пропозиція';
    if (companies.length % 10 > 1 && companies.length % 10 < 5)
      return 'пропозиції';
    if (companies.length > 1) return 'пропозицій';
  };
  return (
    <section>
      <Line>
        {isLoading ? (
          <Typography variant="body1" component="span">
            Підбираємо пропозиції компаній
          </Typography>
        ) : (
          <Typography variant="body1" component="span">
            {proposal.length} {word(proposal)}
          </Typography>
        )}
      </Line>
    </section>
  );
};

export default LineSection;

LineSection.propTypes = {
  isLoading: PropTypes.bool,
};
