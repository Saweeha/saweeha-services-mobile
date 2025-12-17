import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import styles from './Card.styles';

const Card = React.memo(({ children, onPress, style, variant = 'default' }) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      style={[styles.card, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </Component>
  );
});

Card.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined']),
};

export default Card;

