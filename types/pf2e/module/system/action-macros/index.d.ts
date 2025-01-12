import { arcaneSlam } from "./ancestry/automaton/arcane-slam.ts";
import { whirlingThrow } from "./athletics/whirling-throw.ts";
import { tamper } from "./class/inventor/tamper.ts";
import { craft, repair } from "./crafting/index.ts";
import { bonMot } from "./diplomacy/bon-mot.ts";
import { Action } from "../../actor/actions/index.ts";
import * as balance from "./acrobatics/balance.ts";
import * as maneuverInFlight from "./acrobatics/maneuver-in-flight.ts";
import * as squeeze from "./acrobatics/squeeze.ts";
import * as tumbleThrough from "./acrobatics/tumble-through.ts";
import * as climb from "./athletics/climb.ts";
import * as disarm from "./athletics/disarm.ts";
import * as forceOpen from "./athletics/force-open.ts";
import * as grapple from "./athletics/grapple.ts";
import * as highJump from "./athletics/high-jump.ts";
import * as longJump from "./athletics/long-jump.ts";
import * as reposition from "./athletics/reposition.ts";
import * as shove from "./athletics/shove.ts";
import * as swim from "./athletics/swim.ts";
import * as trip from "./athletics/trip.ts";
import * as escape from "./basic/escape.ts";
import * as seek from "./basic/seek.ts";
import * as senseMotive from "./basic/sense-motive.ts";
import * as createADiversion from "./deception/create-a-diversion.ts";
import * as feint from "./deception/feint.ts";
import * as impersonate from "./deception/impersonate.ts";
import * as lie from "./deception/lie.ts";
import * as gatherInformation from "./diplomacy/gather-information.ts";
import * as makeAnImpression from "./diplomacy/make-an-impression.ts";
import * as request from "./diplomacy/request.ts";
import * as avoidNotice from "./exploration/avoid-notice.ts";
import * as senseDirection from "./exploration/sense-direction.ts";
import * as track from "./exploration/track.ts";
import * as decipherWriting from "./general/decipher-writing.ts";
import * as subsist from "./general/subsist.ts";
import * as coerce from "./intimidation/coerce.ts";
import * as demoralize from "./intimidation/demoralize.ts";
import * as administerFirstAid from "./medicine/administer-first-aid.ts";
import * as treatDisease from "./medicine/treat-disease.ts";
import * as treatPoison from "./medicine/treat-poison.ts";
import * as commandAnAnimal from "./nature/command-an-animal.ts";
import * as perform from "./performance/perform.ts";
import * as createForgery from "./society/create-forgery.ts";
import * as concealAnObject from "./stealth/conceal-an-object.ts";
import * as hide from "./stealth/hide.ts";
import * as sneak from "./stealth/sneak.ts";
import * as palmAnObject from "./thievery/palm-an-object.ts";
import * as disableDevice from "./thievery/disable-device.ts";
import * as pickALock from "./thievery/pick-a-lock.ts";
import * as steal from "./thievery/steal.ts";
export { ActionMacroHelpers } from './helpers.ts';
export type { ActionDefaultOptions, SkillActionOptions } from './types.ts';
export declare const ActionMacros: {
    escape: typeof escape.legacy;
    seek: typeof seek.legacy;
    senseMotive: typeof senseMotive.legacy;
    arcaneSlam: typeof arcaneSlam;
    tamper: typeof tamper;
    avoidNotice: typeof avoidNotice.legacy;
    senseDirection: typeof senseDirection.legacy;
    track: typeof track.legacy;
    balance: typeof balance.legacy;
    maneuverInFlight: typeof maneuverInFlight.legacy;
    squeeze: typeof squeeze.legacy;
    tumbleThrough: typeof tumbleThrough.legacy;
    climb: typeof climb.legacy;
    disarm: typeof disarm.legacy;
    forceOpen: typeof forceOpen.legacy;
    grapple: typeof grapple.legacy;
    highJump: typeof highJump.legacy;
    longJump: typeof longJump.legacy;
    reposition: typeof reposition.legacy;
    shove: typeof shove.legacy;
    swim: typeof swim.legacy;
    trip: typeof trip.legacy;
    whirlingThrow: typeof whirlingThrow;
    craft: typeof craft;
    repair: typeof repair;
    createADiversion: typeof createADiversion.legacy;
    feint: typeof feint.legacy;
    impersonate: typeof impersonate.legacy;
    lie: typeof lie.legacy;
    bonMot: typeof bonMot;
    gatherInformation: typeof gatherInformation.legacy;
    makeAnImpression: typeof makeAnImpression.legacy;
    request: typeof request.legacy;
    decipherWriting: typeof decipherWriting.legacy;
    subsist: typeof subsist.legacy;
    coerce: typeof coerce.legacy;
    demoralize: typeof demoralize.legacy;
    administerFirstAid: typeof administerFirstAid.legacy;
    treatDisease: typeof treatDisease.legacy;
    treatPoison: typeof treatPoison.legacy;
    commandAnAnimal: typeof commandAnAnimal.legacy;
    perform: typeof perform.legacy;
    createForgery: typeof createForgery.legacy;
    concealAnObject: typeof concealAnObject.legacy;
    hide: typeof hide.legacy;
    sneak: typeof sneak.legacy;
    palmAnObject: typeof palmAnObject.legacy;
    disableDevice: typeof disableDevice.legacy;
    pickALock: typeof pickALock.legacy;
    steal: typeof steal.legacy;
};
export declare const SystemActions: Action[];
