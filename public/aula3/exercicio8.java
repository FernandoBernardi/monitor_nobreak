package aula3;

import java.util.Scanner;
/*
 * 5. Faça um algoritmo para calcular o valor total de venda, dado que o 
 * usuário deverá entrar com o valor unitário de um produto e a quantidade vendida.
 */
public class exercicio8{
	
	public static void main(String a[]) {
    Scanner scan = new Scanner(System.in);
    float peso;
    float altura;
    float resultado;
		System.out.println("Digite o peso:");
    peso = scan.nextFloat();
    System.out.println("Digite a altura:");
    altura = scan.nextFloat();
    resultado = peso/(altura*altura);
    System.out.printf("Seu IMC é  %s",resultado);
	}
}
/*
8. Faça um algoritmo que receba como entrada o peso e a altura de uma pessoa e calcule/mostre o
seu IMC.
O IMC é dado pela fórmula: IMC = peso / altura².

escrever "digite sua altura"
ler altura
escrever "digite seu peso"
ler peso
imc = peso/(altura*altura)
escrever "seu imc "imc
*/