import { nanoid } from "nanoid";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { SpriteSVG } from "../../images/SpriteSVG";
import {
  BoxImgS,
  GridContainer,
  ItemS,
  TextContainerS,
} from "./AdvatagesSectionStyle";
import { ContainerSection } from "../../style/Global.styled";
import { useState } from "react";
import dataFromJson from "../../assets/texts/advantages.json";

const AdvatagesSection = () => {
  const [data, _] = useState(dataFromJson);

  return (
    <section>
      <ContainerSection id="переваги">
        <Typography
          variant="h2"
          sx={{ marginBottom: "40px", textAlign: "center " }}
        >
          Наші переваги
        </Typography>
        <GridContainer container>
          {data.map(({ svg, title, text }) => {
            return (
              <Grid key={nanoid()} xs={12} sm={12} md={12} lg={12}>
                <ItemS>
                  <BoxImgS>
                    <SpriteSVG name={svg}></SpriteSVG>
                  </BoxImgS>
                  <TextContainerS>
                    <Typography
                      variant="h3"
                      sx={{
                        marginBottom: { xs: "4px", sm: "8px", lg: "0" },
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="body1">{text}</Typography>
                  </TextContainerS>
                </ItemS>
              </Grid>
            );
          })}
        </GridContainer>
      </ContainerSection>
    </section>
  );
};

export default AdvatagesSection;
