import { ActorPF2e } from '../../actor/index.ts';
import { Language } from '../../actor/creature/types.ts';
import { ItemPF2e } from '../../item/index.ts';
import { TagSelectorBasicData } from './basic.ts';
import { TagSelectorBasic, SelectableTagField, TagSelectorOptions } from './index.ts';
declare class LanguageSelector extends TagSelectorBasic<ActorPF2e | ItemPF2e> {
    static get defaultOptions(): TagSelectorOptions;
    choices: typeof CONFIG.PF2E.languages;
    constructor(document: ActorPF2e | ItemPF2e, options?: Partial<TagSelectorOptions>);
    protected get configTypes(): readonly SelectableTagField[];
    getData(options?: Partial<TagSelectorOptions>): Promise<LanguageSelectorData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface LanguageSelectorData extends TagSelectorBasicData<ActorPF2e | ItemPF2e> {
    choices: Record<Language, ChoiceData>;
    hasRarity: true;
}
interface ChoiceData {
    disabled: boolean;
    label: string;
    rarity: {
        slug: string;
        label: string;
    } | null;
    selected: boolean;
    source: string | null;
}
export { LanguageSelector };
