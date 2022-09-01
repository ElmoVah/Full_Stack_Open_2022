import { HealthCheckEntry } from "../../types";
import Diagnoses from "../Diagnoses";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, orange, yellow, green } from '@mui/material/colors';

const Hospital: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  const rating = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return (
          <FavoriteIcon sx={{ color: green[500] }} />
        );
      case 1:
        return (
          <FavoriteIcon sx={{ color: yellow[500] }} />
        );
      case 2:
        return (
          <FavoriteIcon sx={{ color: orange[500] }} />
        );
      case 3:
        return (
          <FavoriteIcon sx={{ color: red[500] }} />
        );
    }
  };

  return (
    <div>
      <div key={entry.id} style={
        {
          border: '3px solid black',
          padding: '15px',
          borderRadius: '10px'
        }
      }>
        <p>
          {entry.date} <MonitorHeartIcon />
        </p>
        <p>
          {entry.description}
        </p>
        {entry.diagnosisCodes
          ? <Diagnoses diag={entry.diagnosisCodes} />
          : null}
        {rating()}
        <p>
          diagnose by {entry.specialist}
        </p>
      </div>
    </div>
  );
};

export default Hospital;