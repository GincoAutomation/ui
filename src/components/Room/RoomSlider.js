import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: 280
  }
}));
const CustomSlider = withStyles({
  root: {
    color: '#96a0fa',
    height: 2
  },
  thumb: {
    height: 25,
    width: 25,
    backgroundColor: '#1f2666',
    marginTop: -10,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  track: {
    height: 5,
    borderRadius: 3
  },
  rail: {
    height: 5,
    borderRadius: 3
  }
})(Slider);

function RoomSlider(props) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    props.notifyChangeSlider(props.id, newValue);
  };
  return (
    <div className={classes.root}>
      <CustomSlider aria-label="Pretto slider" defaultValue={20} onChange={handleChange} min={8} max={45} />
    </div>
  );
}
RoomSlider.propTypes = {
  notifyChangeSlider: PropTypes.func,
  id: PropTypes.string
};
export default RoomSlider;
