import { render, screen } from '@testing-library/react'
import Saldo from './index'

const makeSut = ({
    saldo = 0
}) => {
    return render(
        <Saldo saldo={saldo}/>
    )
}

describe('Componente <Saldo />', () => {
    it('Deve renderizar saldo com valor monetário', () => {
        makeSut({ saldo: 1000 })

        const saldo = screen.getByTestId('saldo')

        expect(saldo).toHaveTextContent('R$ 1000')
    })
})