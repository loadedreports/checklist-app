import { TextField, TextFieldProps, Typography, TypographyProps } from "@mui/material"
import { useState } from "react"

type EditableTypographyProps = Omit<TypographyProps, 'onBlur'> & {
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  value: string
  readonly: boolean
  TextFieldProps?: TextFieldProps
}

export default function EditableTypography({
  onBlur,
  value,
  readonly,
  TextFieldProps,
  ...props
}: EditableTypographyProps) {

    const [fieldValue, setFieldValue] = useState(value)

    const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(event.target.value)
    }

    return !readonly ?
      <TextField
        variant='outlined'
        fullWidth
        onBlur={onBlur}
        value={fieldValue}
        onChange={handleUpdate}
        {...TextFieldProps}
      /> :
      <Typography
        variant='body1'
        color='text.primary'
        {...props}
      >
        {fieldValue}
      </Typography>
}