import { Avatar, SxProps, Theme } from "@mui/material"

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

type StringAvatarProps = {
  input: string
  sx?: SxProps<Theme>
}

export default function StringAvatar({
  input,
  sx 
}: StringAvatarProps) {

  const initials = input.split(' ')[0][0] + input.split(' ')[1][0]

  return (
    <Avatar
      sx={{
        ...sx,
        bgcolor: stringToColor(input),
      }}
    >
      {initials}
    </Avatar>
  )
}