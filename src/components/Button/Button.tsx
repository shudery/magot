import React from 'react';

import ButtonGroup from '../ButtonGroup';
import Iconable from '../Icon/Iconable';
import * as component from '../component';

import './Button.less';

export type ButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'text'
  | 'link';

interface BaseButtonProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.SizedComponent,
    component.NestedComponent,
    component.IconableComponent {
  /**
   * 是否是全宽按钮，按钮的宽度将被渲染为父组件的宽度
   * @default false
   */
  block?: boolean;

  /**
   * 是否是圆形按钮，适用于纯图标按钮
   * @default false
   */
  circular?: boolean;

  /**
   * 是否是加载中状态
   * @default false
   */
  loading?: boolean;

  /**
   * 是否是方形按钮，宽高相同，但保留圆角，适用于纯图标按钮
   * @default false
   */
  square?: boolean;

  /**
   * 按钮类型，可选值有: `primary`, `success`, `warning`, `danger`, `text`, `link`。
   */
  type?: ButtonType;
}

interface NativeButtonProps
  extends BaseButtonProps,
    component.MouseEventComponent<HTMLButtonElement> {
  /**
   * 设置`button`原生的`type`值，可选值有: `button`, `submit`, `reset`，默认`button`。
   * @default button
   */
  htmlType?: 'button' | 'submit' | 'reset';
}

interface LinkButtonProps
  extends BaseButtonProps,
    component.MouseEventComponent<HTMLAnchorElement> {
  /**
   * 点击按钮跳转的链接，指定此属性后的行为将和`<a>`链接一致
   */
  href?: string;

  /**
   * 相当于`<a>`链接的`target`属性，仅在指定`href`属性后生效
   */
  target?: string;
}

export type ButtonProps = NativeButtonProps | LinkButtonProps;

const defaultProps: Partial<ButtonProps> = {
  ...component.getDefaultDisabledProps(),
  ...component.getDefaultSizedProps(),
  block: false,
  circular: false,
  loading: false,
  square: false,
};

function getClasses(props: BaseButtonProps) {
  const type = 'button';
  const prefix = component.getComponentPrefix(type);
  return component.getComponentClasses(type, props, {
    [`${prefix}-${props.type}`]: !!props.type,
    [`${prefix}-block`]: !!props.block,
    [`${prefix}-circular`]: !!props.circular,
    [`${prefix}-square`]: !!props.square,
  });
}

function Button(props: ButtonProps) {
  if ('href' in props) {
    return <LinkButton {...props}>{props.children}</LinkButton>;
  }
  const nativeBtnProps = props as NativeButtonProps;
  return <NativeButton {...nativeBtnProps}>{props.children}</NativeButton>;
}

function NativeButton(props: NativeButtonProps) {
  const {
    block,
    children,
    className,
    circular,
    icon,
    iconPosition,
    iconSize,
    loading,
    size,
    square,
    type,
    htmlType,
    ...nativeProps
  } = props;
  return (
    <button
      {...nativeProps}
      type={htmlType || 'button'}
      className={getClasses(props)}>
      <ButtonContent {...props}>{children}</ButtonContent>
    </button>
  );
}

function LinkButton(props: LinkButtonProps) {
  const {
    block,
    children,
    className,
    circular,
    icon,
    iconPosition,
    iconSize,
    loading,
    size,
    square,
    type,
    ...nativeProps
  } = props;
  return (
    <a {...nativeProps} className={getClasses(props)}>
      <ButtonContent {...props}>{children}</ButtonContent>
    </a>
  );
}

function ButtonContent(props: BaseButtonProps) {
  return (
    <Iconable
      name={props.loading ? 'loading' : props.icon}
      spin={props.loading}
      position={props.iconPosition}
      size={props.iconSize}>
      {props.children}
    </Iconable>
  );
}

Button.defaultProps = defaultProps;
Button.Group = ButtonGroup;

export default Button;
