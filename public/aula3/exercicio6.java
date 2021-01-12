package aula3;

import java.util.Scanner;
/*
 * 5. Faça um algoritmo para calcular o valor total de venda, dado que o 
 * usuário deverá entrar com o valor unitário de um produto e a quantidade vendida.
 */
public class exercicio6{
	
	public static void main(String a[]) {
    Scanner scan = new Scanner(System.in);
    String nome;
    String cidade;
    String estado;
    String telefone;
		System.out.println("Digite o nome:");
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
6. Faça um algoritmo que deverá receber as informações do usuário (nome, cidade, UF, telefone). Em seguida o algoritmo deverá mostrar estes dados na tela.

escrever "Digite seu nome: "
ler nome
escrever "Digite a sua cidade: "
ler cidade
escrever "Digite o seu estado: "
ler uf
escrever "Digite o seu numero de telefone: "
ler numero
escrever "Nome:"nome
escrever "Cidade:"cidade
escrever "Estado:"uf
escrever "Numero:"numero
*/