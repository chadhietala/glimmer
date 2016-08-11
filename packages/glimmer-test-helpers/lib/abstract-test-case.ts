import { PathReference, Tagged, Revision, RevisionTag, DirtyableTag } from 'glimmer-reference';
import { Opaque } from 'glimmer-util';
<<<<<<< 121d7fda38ad496e8528328555d09918f1e59ed7
import { assign } from './helpers';
=======
>>>>>>> Refactors DOMHelper into append and updating operations

export function skip(target: Object, name: string, descriptor: PropertyDescriptor) {
  descriptor.value['skip'] = true;
}

export class VersionedObject implements Tagged<Revision> {
  public tag: DirtyableTag;
  public value: Object;

  constructor(value: Object) {
    this.tag = new DirtyableTag();
<<<<<<< 121d7fda38ad496e8528328555d09918f1e59ed7
    assign(this, value);
  }

  update(value: Object) {
    assign(this, value);
=======
    Object.assign(this, value);
  }

  update(value: Object) {
    Object.assign(this, value);
>>>>>>> Refactors DOMHelper into append and updating operations
    this.dirty();
  }

  set(key: string, value: Opaque) {
    this[key] = value;
    this.dirty();
  }

  dirty() {
    this.tag.dirty();
  }
}

export class SimpleRootReference implements PathReference<Opaque> {
  public tag: RevisionTag;

  constructor(private object: VersionedObject) {
    this.tag = object.tag;
  }

  get(key: string): SimplePathReference {
    return new SimplePathReference(this, key);
  }

  value(): Object {
    return this.object;
  }
}

class SimplePathReference implements PathReference<Opaque> {
  public tag: RevisionTag;

  constructor(private parent: PathReference<Opaque>, private key: string) {
    this.tag = parent.tag;
  }

  get(key: string): SimplePathReference {
    return new SimplePathReference(this, key);
  }

  value() {
    return this.parent.value()[this.key];
  }
}
