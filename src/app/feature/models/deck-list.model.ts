import { CardListModel } from "./card-list.model"

export interface DeckModel {
    nomeDoBaralho: string,
    cartasSelecionadas: CardListModel[],
    numeroCartas: number,
    cartasTreinador: number,
    uniqueTypes: number
}