import { EquipmentTrait } from '../equipment/data.ts';
import { BasePhysicalItemSource, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from '../physical/data.ts';
type BookSource = BasePhysicalItemSource<"book", BookSystemSource>;
type BookTraits = PhysicalItemTraits<EquipmentTrait>;
interface BookSystemSource extends PhysicalSystemSource {
    traits: BookTraits;
    category: "formula" | "spell";
    capacity: number;
    contents: ItemUUID[];
    subitems?: never;
}
interface BookSystemData extends Omit<BookSystemSource, SourceOmission>, Omit<PhysicalSystemData, "subitems" | "traits"> {
}
type SourceOmission = "apex" | "bulk" | "description" | "hp" | "identification" | "material" | "price" | "temporary" | "usage";
export type { BookSource, BookSystemData };
