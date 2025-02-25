import Box from '@mui/material/Box';
import React, { Component } from 'react'

class ErrorBoundary extends Component<any, { [key: string]: any }> {
  constructor(props: {}) {
    super(props)

    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    // console.log(error)
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
        <Box component={'img'}  src='src/assets/images/logo.png' />
        </>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary