import { error, warn } from '../../lib/logger';

type TSelectors = '#' | '.';

const validate = <T extends HTMLElement = HTMLElement>(el: HTMLElement | undefined | null, query: string, required: boolean): T => {
  const node = el as T;
  if (!node) {
    const msg = `Node "${query}" does not exist.`;
    if (required === true) {
      error(msg);
      throw new Error(msg);
    }
    warn(`${msg} Substituted ephemeral element.`);
    return document.createElement('div') as unknown as T;
  }
  return node;
};

export const getNodeById = <T extends HTMLElement = HTMLElement>(name: string, required = true) => {
  const node = document.getElementById(`${name}`);
  return validate<T>(node, `id="${name}"`, required);
};

export function getNodeByQuery<T extends HTMLElement = HTMLElement>(query: string): T;
export function getNodeByQuery<T extends HTMLElement = HTMLElement>(query: string, required: boolean): T;
export function getNodeByQuery<T extends HTMLElement = HTMLElement>(query: string, selector: TSelectors, required: boolean): T;
export function getNodeByQuery<T extends HTMLElement = HTMLElement>(query: string, opt1: boolean | TSelectors = '#', opt2 = true): T {
  const selector = (typeof opt1 === 'boolean') ? '#' : opt1;
  const required = (typeof opt1 === 'boolean') ? opt1 : opt2;
  const qs       = (query.startsWith(selector)) ? query : `${selector}${query}`;
  const node     = document.querySelector(qs) as HTMLElement;
  return validate<T>(node, `qs="${qs}"`, required);
}

export const getNodesByQuery = <T extends HTMLElement = HTMLElement>(query: string, selector: TSelectors = '.') => {
  const ret: T[] = [];
  const qs       = (query.startsWith(selector)) ? query : `${selector}${query}`;
  const matches  = document.querySelectorAll(qs);
  for (const m of matches) {
    const node = validate<T>(m as HTMLElement, `qs="${qs}"`, false);
    ret.push(node);
  }
  return ret;
};
