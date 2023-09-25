import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Formulario from '.'

const makeSut = ({
    realizarTransacao = jest.fn()
}) => {
    return render(
        <Formulario realizarTransacao={realizarTransacao} />
    )
}

describe('Deve renderizar um campo de input', () => {
    test('no documento', () => {
        makeSut({})
    
        const campoTexto = screen.getByPlaceholderText('Digite um valor')
    
        expect(campoTexto).toBeInTheDocument()
    });
    
    test('com type number', () => {
        makeSut({})
    
        const campoTexto = screen.getByPlaceholderText('Digite um valor')
    
        expect(campoTexto).toHaveAttribute('type', 'number')
    });
    
    test('que pode ser preenchido', () => {
        makeSut({})
    
        const campoTexto = screen.getByPlaceholderText('Digite um valor')
    
        userEvent.type(campoTexto, '50')
    
        expect(campoTexto).toHaveValue(50)
    });
});

test('Deve chamar um evento de onSubmit ao clicar em realizar transação', () => {
    const realizarTransacao = jest.fn();
    makeSut({ realizarTransacao });
    
    const botao = screen.getByRole('button');
    userEvent.click(botao);

    expect(realizarTransacao).toBeCalledTimes(1);
})

describe('Deve selecionar um tipo de transação', () => {
    it('Transação deve ser do tipo depósito', async () => {
        makeSut({});

        const tipoTransacao = screen.getByTestId('select-opcoes');
        userEvent.click(tipoTransacao);

        const deposito = screen.getByText('Depósito');
        userEvent.click(deposito);

        expect(tipoTransacao).toHaveTextContent('Depósito')
    });

    it('Transação deve ser do tipo transferência', async () => {
        makeSut({});

        const tipoTransacao = screen.getByTestId('select-opcoes');
        userEvent.click(tipoTransacao);

        const transferencia = screen.getByText('Transferência');
        userEvent.click(transferencia);

        expect(tipoTransacao).toHaveTextContent('Transferência')
    });
})