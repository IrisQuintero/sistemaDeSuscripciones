import styled from 'styled-components';

const Name = styled.p`
    font-size: 24px;
    font-weight: 700; 
    text-transform: capitalize;
  `

  const Pricing = styled.p`
    font-size: 20px;
    font-weight: 400;
    `

  const Button = styled.button`
    background-color: white;
    border-radius: 24px;
    border: 0;
    font-size: 20px;
    font-weight: 700;
    height: 48px;
    width: 250px;
    `

  const InnerContainer = styled.div`
    align-items: center; 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `

  const Divider = styled.div`
    background-color: #444444;
    height: 1px;
    width: 100%;
  `

  const Container = styled.div`
    background-color: #333333;
    border-color: #444444;
    border-radius: 8px;
    border-width: 1px;
    display: flex;
    flex-direction: column; 
    padding: 24px;

    > *:not(:last-child) {
        margin-bottom: 16px;
    }
  `

  const Feature = styled.p`
    font-size: 16px;
    font-weight: 400;
  `
//isSelected, onSubscribeClick
  export function Plan({ name, price, interval, feature, onSubscribeClick }) {
      return (
          <Container>
              <InnerContainer>
                  <div>
                      <Name style={{ marginBottom: '10px'}}>
                          {name}
                      </Name>
                      <Pricing>
                          ${price} / {interval}
                      </Pricing>
                  </div>
                  <div>
                      <Button onClick={onSubscribeClick}>Subscribe</Button>
                  </div>
              </InnerContainer>
              <Divider/>
              <Feature>{feature}</Feature>
          </Container>
      )
  }

