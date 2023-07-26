import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models/subscription.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

subs: Subscription[] = [
    {
      id: 1,
      description: 'Plano Clubinho Bem Viver',
      price: 79.90,
      type: 1,
      image: 'https://yata.s3-object.locaweb.com.br/f69652aa4ce5925f4e2dbdca0ab4716db8feb5e70bc1d8feb384883119e5a77c',
      detailImg: 'https://yata-apix-e2749511-a14d-4e67-a909-50b7e7dba3bf.s3-object.locaweb.com.br/92f663a395a5479f8a05a6dc71d59df5.png',
      longDescription: "O plano perfeito para seu filho(a) aprender se divertindo!\n\nO que você recebe mensalmente:\n\n- 1 Livro Infantil ligado a Antroposofia ou à Pedagogia Waldorf (escolhidos entre as opções disponibilizadas por nossa curadoria)\n\n- 1 Brinquedo Educativo de madeira que estimula o aprendizado de forma lúdica"
    },
    {
      id: 2,
      description: 'Plano Clube Bem Viver',
      price: 89.90,
      type: 2,
      image: 'https://yata.s3-object.locaweb.com.br/014ce0f43b3f42e5edccf4d4b9e095af0ba6b2f1f92a465296dfad5fa3f0e073',
      detailImg: 'https://yata-apix-e2749511-a14d-4e67-a909-50b7e7dba3bf.s3-object.locaweb.com.br/4d85b8af3f8f44f7a8e458a916394abf.png',
      longDescription: "Plano para você que é envolvido com temáticas Antroposíficas - por exemplo mãe ou pai de alunos de Escolas Waldorf,  pessoas interssadas em Antroposofia, etc!\n\nO que você recebe mensalmente:\n\n- 1 Livro ligado a Antroposofia ou à Pedagogia Waldorf (escolhidos entre as opções disponibilizadas por nossa curadoria)"
    },
    {
      id: 3,
      description: 'Plano Clube Bem Viver Pró',
      price: 99.90,
      type: 3,
      image: 'https://yata.s3-object.locaweb.com.br/893fae053669ad698591608ec0c8b59d79664b46b780b6935869975bb56615e5',
      detailImg: 'https://yata-apix-e2749511-a14d-4e67-a909-50b7e7dba3bf.s3-object.locaweb.com.br/92f663a395a5479f8a05a6dc71d59df5.png',
      longDescription: "Plano para você educador ou profissional de Escola Waldorf!\n\nO que você recebe mensalmente:\n\n- 1 Livro voltado para professores e profissionais da área (escolhidos entre as opções disponibilizadas por nossa curadoria)\n\n- 1 Livro Infantil que pode ser utilizado para contação de histórias, biblioteca da escola, presentear professores ou alunos"
    }
  ]


constructor (private router: Router) { }

ngOnInit(): void {

}


productDetails(subscription: Subscription) {
  this.router.navigateByUrl(`products-detail/${subscription.id}`, { state: { subscription } });
}

}
