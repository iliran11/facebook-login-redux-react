import React from 'react';

const listItem = props => {
  return (
    <div style={styles.itemContainer}>
      <img src={props.svg} style={styles.svg} alt="" />
      <div>{props.text}</div>
    </div>
  );
};

const styles = {
  itemContainer: {
    marginLeft: 0,
    padding: '16px 16px 16px 72px',
    position: 'relative'
  },
  svg: {
    width: 24,
    position: 'absolute',
    top: 0,
    margin: 12,
    left: 4
  }
};

export default listItem;