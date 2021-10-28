import React, { FC } from "react"

interface Props {
  text: string
}

const ErrorHandler: FC<Props> = ({ text }: Props) => {
  return <p className="text-danger error-handler">{text}</p>
}

export default ErrorHandler
