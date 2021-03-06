import React from 'react';

import Popup from '../Popup';
import * as component from '../component';
import { Placement } from '../../utils/placement';

import './Tooltip.less';

export interface TooltipProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 提示文案
   */
  title: string | React.ReactNode;

  /**
   * 气泡位置，12个方位，
   * 可选值：`left`,`top`,`right`,`bottom`,`topLeft`,`topRight`,`bottomLeft`,`bottomRight`,`leftTop`,`leftBottom`,`rightTop`,`rightBottom`，
   * 默认值是`top`
   * @default top
   */
  placement?: Placement;
}

function Tooltip(props: TooltipProps) {
  const type = 'tooltip';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);
  const tooltip = (
    <div className={cls} style={{ ...props.style }}>
      {props.title}
    </div>
  );
  return (
    <Popup
      className={prefix + '-popup'}
      placement={props.placement}
      removeWhenClose={true}
      overlay={tooltip}>
      {props.children}
    </Popup>
  );
}

export default Tooltip;
