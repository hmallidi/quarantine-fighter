ifeq ($(shell uname -s), Darwin)
    BLACK         := black
    CHECKTESTDATA := checktestdata
    COVERAGE      := coverage3
    MYPY          := mypy
    PYDOC         := pydoc3
    PYLINT        := pylint
    PYTHON        := python3
else ifeq ($(shell uname -p), unknown)
    BLACK         := black
    CHECKTESTDATA := checktestdata
    COVERAGE      := coverage
    MYPY          := mypy
    PYDOC         := pydoc
    PYLINT        := pylint
    PYTHON        := python
else
    BLACK         := black
    CHECKTESTDATA := checktestdata
    COVERAGE      := coverage3
    MYPY          := mypy
    PYDOC         := pydoc3
    PYLINT        := pylint3
    PYTHON        := python3
endif

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  *.tmp
status:
	make clean
	@echo
	git branch
	git remote -v
	git status
# run locally
local run: models.py
	python models.py
.PHONY: models
models.html: models.py
	$(PYDOC) -w models
.PHONY: IDB3.log
IDB3.log:
	git log --use-mailmap > IDB3.log
versions:
	which       git
	git         --version
	@echo
	which       make
	make        --version
	@echo
	which        $(PYTHON)
	$(PYTHON)    --version


