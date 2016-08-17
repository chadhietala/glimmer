import * as SimpleDOM from 'simple-dom';
import { ConcreteBounds } from 'glimmer-runtime/lib/bounds';
import { DOMTreeConstruction, Bounds, Simple } from 'glimmer-runtime';

export default class NodeDOMTreeConstruction extends DOMTreeConstruction {
  protected document: SimpleDOM.Document;
  constructor() {
    super(new SimpleDOM.Document());
  }

  insertHTMLBefore(parent: Simple.Element, html: string, reference: Simple.Node): Bounds {
    let prev = reference ? reference.previousSibling : parent.lastChild;

    let raw = this.document.createRawHTMLSection(html);
    parent.insertBefore(raw, reference);

    let first = prev ? prev.nextSibling : parent.firstChild;
    let last = reference ? reference.previousSibling : parent.lastChild;

    return new ConcreteBounds(parent, first, last);
  }
}
