import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './style';

export default class MenuItem extends React.Component {
  static defaultProps = {
    prefixCls: s.menuPrefix,
    title: '',
    children: ''
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }

  itemClick = e => {
    e.nativeEvent.stopImmediatePropagation();
    const { eventKey, disabled } = this.props;
    const { selectedKeys, multiple } = this.props;
    if (disabled) {
      return
    }
    let backSelected = [].concat(selectedKeys);
    const index = selectedKeys.indexOf(eventKey);
    if (index >= 0) {
      backSelected.splice(index, 1);
    } else if (multiple) {
      backSelected = backSelected.concat([eventKey]);
    } else {
      backSelected = [eventKey]
    }
    this.props.onSelect(backSelected);
  }

  render() {
    const { prefixCls, children, level, selectedKeys, eventKey, mode, disabled } = this.props;
    let style = {};
    if (mode === 'inline') {
      style = {
        paddingLeft: level * 24
      }
    }
    const clsssName = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-selected`]: selectedKeys.indexOf(eventKey) >= 0,
      [`${prefixCls}-item-disabled`]: disabled
    });
    return (
      <li
        className={clsssName}
        style={style}
        onClick={this.itemClick}
      >
        { children }
      </li>
    );
  }
}
