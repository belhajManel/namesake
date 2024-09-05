import type { ReactNode } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  type RadioProps,
  type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "../utils";
import { Description, FieldError, Label } from "./Field";

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "children"> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <AriaRadioGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-2",
      )}
    >
      <Label>{props.label}</Label>
      <div className="flex group-orientation-vertical:flex-col gap-2 group-orientation-horizontal:gap-4">
        {props.children}
      </div>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaRadioGroup>
  );
}

const styles = tv({
  extend: focusRing,
  base: "w-5 h-5 rounded-full border-2 bg-white dark:bg-gray-12 transition-all",
  variants: {
    isSelected: {
      false:
        "border-gray-4 dark:border-gray-4 group-pressed:border-gray-5 dark:group-pressed:border-gray-3",
      true: "border-[7px] border-gray-9 dark:border-gray-3 forced-colors:!border-[Highlight] group-pressed:border-gray-10 dark:group-pressed:border-gray-2",
    },
    isInvalid: {
      true: "border-red-10 dark:border-red-9 group-pressed:border-red-11 dark:group-pressed:border-red-10 forced-colors:!border-[Mark]",
    },
    isDisabled: {
      true: "border-gray-2 dark:border-gray-8 forced-colors:!border-[GrayText]",
    },
  },
});

export function Radio(props: RadioProps) {
  return (
    <AriaRadio
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex gap-2 items-center group text-gray-10 disabled:text-gray-3 dark:text-gray-2 dark:disabled:text-gray-6 forced-colors:disabled:text-[GrayText] text-sm transition",
      )}
    >
      {(renderProps) => (
        <>
          <div className={styles(renderProps)} />
          {props.children}
        </>
      )}
    </AriaRadio>
  );
}
