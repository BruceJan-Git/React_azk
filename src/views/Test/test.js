import React from 'react';
// require ('./font')

class Test extends React.Component {
  render() {
    return (
      <div>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-bofang"></use>
        </svg>
      </div >
    )
  }
}
export default Test
