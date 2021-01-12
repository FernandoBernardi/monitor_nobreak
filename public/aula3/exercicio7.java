package aula3;

import java.util.Scanner;
/*
 * 5. Faça um algoritmo para calcular o valor total de venda, dado que o 
 * usuário deverá entrar com o valor unitário de um produto e a quantidade vendida.
 */
public class exercicio7{
	
	public static void main(String a[]) {
    Scanner scan = new Scanner(System.in);
    float num;
    float resultado;
		System.out.println("Digite o numero para elevar ao quadrado:");
    num = scan.nextFloat();
    resultado = num+num; 
    
    System.out.printf("O resultado é %s", resultado);
	}
}
/*
7. Construa um algoritmo que receba um número n e imprima o valor correspondente ao seu quadrado (n²).

Escrever "Digite um numero para elevar ao quadrado: "
ler(num)
quadrado = num * num
Escrever "quadrado do numero informado eh: " quadrado
*/