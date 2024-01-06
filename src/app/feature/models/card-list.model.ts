export interface CardListModel {
    id: string;
    name: string;
    hp: string;
    images: { small: string; big: string };
    selected: boolean;
    superType: string;
    types: string[];
}
