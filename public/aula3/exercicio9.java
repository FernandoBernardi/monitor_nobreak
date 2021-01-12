package aula3;

import java.util.Scanner;
/*
 * 5. Faça um algoritmo para calcular o valor total de venda, dado que o 
 * usuário deverá entrar com o valor unitário de um produto e a quantidade vendida.
 */
public class exercicio9{
	
	public static void main(String a[]) {
    Scanner scan = new Scanner(System.in);
    String nome;
    String cidade;
    String estado;
    String telefone;
		System.out.println("Digite o valor de A:");
    nome = scan.nextLine();
    System.out.println("Digite a cidade:");
    cidade = scan.nextLine();
    System.out.println("Digite o estado:");
    estado = scan.nextLine();
    System.out.println("Digite o telefone:");
    telefone = scan.nextLine();
    
    System.out.printf("Seu nome é %s mora na cidade %s - %s e o telefone é %s",nome,cidade,estado,telefone);
	}
}
/*
9. Faça um algoritmo que receba como entrada 2 valores inteiros e armazene em uma variável a e
b, depois troque os valores de a com b e mostre-os na tela.

escreva "valor a"
ler a
escreva "valor b"
ler b
aa = b
bb = a
a = aa
b = bb
escrever "valor a"aa
escrever "valor b"bb
*/