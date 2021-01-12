package aula3;

import java.util.Scanner;
/*
 * 5. Faça um algoritmo para calcular o valor total de venda, dado que o 
 * usuário deverá entrar com o valor unitário de um produto e a quantidade vendida.
 */
public class exercicio10{
	
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
10.Construa um programa que leia uma quantidade em horas, minutos, segundos e informe a
quantidade total de segundos equivalente.

escrever "Digite horas"
ler horas
escrever "Digite minitos"
ler min
escrever "Digite segundos"
ler seg
h_seg=horas*3600
m_seg=min*60
total =  h_seg + m_seg + seg
escrever "total :"total
*/