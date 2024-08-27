import { ImageList, ImageListItem } from '@mui/material'

import useCurrentBreakpoint from '../../hooks/useCurrentBreakpoint'

type UnknownWithId = {
  id: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export default function CardGrid({
  cardData,
  CardComponent,
  variant = 'standard',
  AddCardComponent,
}: {
  cardData: UnknownWithId[] | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CardComponent: React.FC<{ data: any}>,
  variant?: 'standard' | 'masonry',
  AddCardComponent?: React.FC | undefined,
}) {

  const numCols = useCurrentBreakpoint<number>({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
  }) ?? 1

  return (
    <ImageList
      variant={variant}
      cols={numCols}
      gap={16}
      sx={{
        padding: 1
      }}
    >
      {CardComponent && cardData?.map((card) => (
        <ImageListItem key={card?.id || crypto.randomUUID()}>
          <CardComponent data={card} />
        </ImageListItem>
      ))}
      {AddCardComponent &&
        <ImageListItem>
          <AddCardComponent />
        </ImageListItem>
      }
    </ImageList>
  )
}