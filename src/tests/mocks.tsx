/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle } from 'react'

export const ViewportListMock = forwardRef(
  ({ items = [], children }: { items: any[]; children: any }, ref) => {
    useImperativeHandle(
      ref,
      () => ({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        scrollToIndex: () => {},
      }),
      []
    )

    return (
      <>
        <div />
        {items.map(children)}
        <div />
      </>
    )
  }
)

ViewportListMock.displayName = 'ViewportList'
