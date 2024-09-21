import { RiCheckLine, RiSubtractLine } from "@remixicon/react";
import type { ReactNode } from "react";
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type CheckboxProps,
  type ValidationResult,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { FieldDescription, FieldError, Label } from "../Field";
import { composeTailwindRenderProps, focusRing } from "../utils";

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, "children"> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-2",
      )}
    >
      <Label>{props.label}</Label>
      {props.children}
      {props.description && (
        <FieldDescription>{props.description}</FieldDescription>
      )}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}

const checkboxStyles = tv({
  base: "flex gap-2 items-center group text-sm transition",
  variants: {
    isDisabled: {
      false: "text-gray-normal cursor-pointer",
      true: "opacity-50 forced-colors:text-[GrayText] cursor-default",
    },
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: "w-6 h-6 flex-shrink-0 rounded flex items-center justify-center border-2 transition",
  variants: {
    isSelected: {
      false: "bg-white dark:bg-gray-12 border-gray-dim",
      true: "bg-purple-9 dark:bg-purpledark-9 border-transparent",
    },
    isInvalid: {
      true: "text-red-9 dark:text-reddark-9 forced-colors:![--color:Mark] group-pressed:[--color:theme(colors.red.800)] dark:group-pressed:[--color:theme(colors.red.700)]",
    },
    isDisabled: {
      true: "text-gray-7 dark:text-graydark-7 forced-colors:![--color:GrayText]",
    },
  },
});

const iconStyles =
  "w-5 h-5 text-white group-disabled:text-gray-4 dark:group-disabled:text-gray-9 forced-colors:text-[HighlightText]";

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            className={boxStyles({
              isSelected: isSelected || isIndeterminate,
              ...renderProps,
            })}
          >
            {isIndeterminate ? (
              <RiSubtractLine aria-hidden className={iconStyles} />
            ) : isSelected ? (
              <RiCheckLine aria-hidden className={iconStyles} />
            ) : null}
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  );
}